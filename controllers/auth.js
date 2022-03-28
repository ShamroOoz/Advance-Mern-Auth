import { User } from "../models/User.js";

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({ sucess: true, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Check that user exists by email
    const user = await User.login(email, password);
    sendToken(user, 200, res);
  } catch (err) {
    next(err);
  }
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

export { login, register, forgotPassword, resetPassword };
