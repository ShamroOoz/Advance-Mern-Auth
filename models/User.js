import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.js";
import crypto from "crypto";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide username"],
  },
  email: {
    type: String,
    required: [true, "Please provide email address"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide a valid email",
    ],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Please add a password"],
    minlength: 6,
    select: false,
  },
  refreshToken: [String],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// instance method to to convert Password
// this === user enter data
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// instance method to to getSignedJwtToken
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "30s",
  });
};

// static method to login user
// this === model("User")
UserSchema.statics.login = async function (email, password, cookies, res) {
  //check email and password available...
  if (!email || !password) {
    throw new ErrorResponse("Please provide an email and password", 400);
  }

  const user = await this.findOne({ email }).select("+password");
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      // Changed to let keyword
      let newRefreshTokenArray = !cookies?.jwt
        ? user.refreshToken
        : user.refreshToken.filter((rt) => rt !== cookies.jwt);

      if (cookies?.jwt) {
        const refreshToken = cookies.jwt;
        const foundToken = await this.findOne({ refreshToken }).exec();
        // Detected refresh token reuse!
        if (!foundToken) {
          console.log("attempted refresh token reuse at login!");
          // clear out ALL previous refresh tokens
          newRefreshTokenArray = [];
          res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "None",
            secure: true,
          });
        }
      }
      const newRefreshToken = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        }
      );
      // Saving refreshToken with current user
      user.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await user.save();

      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return result;
    }
  }
  throw new ErrorResponse("Invalid credentials", 401);
};

UserSchema.statics.RefreshTokenfun = async function (refreshToken, res) {
  const foundUser = await this.findOne({ refreshToken }).exec();

  if (!foundUser) {
    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) throw new ErrorResponse("Forbidden access this route", 403); //Forbidden

      console.log("attempted refresh token reuse!");

      const hackedUser = await this.findById(decoded.id).exec();

      hackedUser.refreshToken = [];

      const result = await hackedUser.save();

      console.log(result);
    });
    throw new ErrorResponse("Forbidden access this route", 403);
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      console.log("expired refresh token");
      foundUser.refreshToken = [...newRefreshTokenArray];
      const result = await foundUser.save();
      console.log(result);
    }
    if (err || foundUser.id !== decoded.id)
      throw new ErrorResponse("Forbidden access this route", 403);
  });

  const newRefreshToken = jwt.sign(
    { id: foundUser._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  // Saving refreshToken with current user
  foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
  const result = await foundUser.save();
  // Creates Secure Cookie with refresh token
  res.cookie("jwt", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return result;
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token (private key) and save to database
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set token expire date
  this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes

  // Create reset url to email to provided email
  const resetUrl = `${process.env.CLIENT_URL}/password-reset/${resetToken}`;

  // HTML Message
  const message = `
      <h1>You have requested a password reset</h1>
      <p>Please make a put request to the following link:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;
  return message;
};

export const User = mongoose.model("User", UserSchema);
