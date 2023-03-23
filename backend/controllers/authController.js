const errorHandler = require("../middlewares/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

//* jwt token
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken(res);
  res.status(statusCode).json({
    success: true,
    token,
  });
};

// * register
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // check for existing user
    const existingEmail = await userModel.findOne({ email });
    if (existingEmail) {
      return next(new errorResponse("Email is already registered", 500));
    }
    const user = await userModel.create({ username, email, password });
    sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// * login
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return next(new errorResponse("Please provide email or password"));
    }
    const user = await userModel.findOne({ email });

    // check if user is available
    if (!user) {
      return next(new errorResponse("Invalid credential", 401));
    }

    // check password
    const isMatch = await userModel.matchPassword(password);

    if (!isMatch) {
      return next(new errorHandler("Invalid credential", 401));
    }

    // response
    sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// * logout
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
};
