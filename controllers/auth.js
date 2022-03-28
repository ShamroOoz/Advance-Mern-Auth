import { User } from "../models/User.js";

const login = async (req, res, next) => {
  res.send("Welcomw to Login");
};

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};
const forgotPassword = async (req, res, next) => {};
const resetPassword = async (req, res, next) => {};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

export { login, register, forgotPassword, resetPassword };
