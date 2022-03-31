import { User } from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";
import ErrorResponse from "../utils/errorResponse.js";
import crypto from "crypto";

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

const Logout = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return next(new ErrorResponse("No content", 204));

  const refreshToken = cookies.jwt;

  try {
    // Is refreshToken in db?
    const foundUser = await User.findOne({ refreshToken }).exec();

    if (!foundUser) {
      res.clearCookie("jwt", {
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });
      return next(new ErrorResponse("No content", 204));
    }
    // Delete refreshToken in db
    foundUser.refreshToken = "";
    const result = await foundUser.save();

    res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });

    res.status(201).json({ sucess: true, message: "Logout Done..." });
  } catch (error) {
    next(error);
  }
};

const handleRefreshToken = async (req, res, next) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return next(new ErrorResponse("Not authorized to access this route", 401));

  const refreshToken = cookies.jwt;

  try {
    const user = await User.RefreshTokenfun(refreshToken);
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check that user exists by email
    const user = await User.login(email, password);

    res.cookie("jwt", user.refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new ErrorResponse("credentials Missing....", 400));

  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 201, res);
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;
  console.log(email);

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return next(new ErrorResponse("No user  Found..", 404));
    }
    // Reset Token Gen and add to database hashed (private) version of token
    const message = user.getResetPasswordToken();
    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });
      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();
      next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
};
const resetPassword = async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new ErrorResponse("Invalid Token", 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
};

export {
  login,
  register,
  forgotPassword,
  resetPassword,
  handleRefreshToken,
  Logout,
};
