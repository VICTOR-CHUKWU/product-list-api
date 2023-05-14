const User = require("../models/user.model");
const asyncWrapper = require("../middleware/async");
const { createCustomeError } = require("../errors/customeError");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const createUser = asyncWrapper(async (req, res, next) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return next(createCustomeError("bad request", 400));
  }
  const user = await User.create({
    email,
    name,
    password: bcrypt.hashSync(password, 8),
  });
  if (user) {
    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400, // 24 hours
      }
    );
    res.status(201).json({
      success: true,
      message: "account created successfully",
      user,
      token,
    });
  } else {
    res.status(404).json({
      success: false,
      message: "user creation failed",
      user: null,
    });
  }
});

const getUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || password) {
    return next(createCustomeError("bad request", 400));
  }
  const user = await User.findOne({ email }).exec();
  if (!user) {
    return next(createCustomeError(`user not found`, 404));
  }
  const passwordMatch = await user.comparePassword(password);
  if (!passwordMatch) {
    return next(createCustomeError(`invalid password`, 404));
  }
  const token = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: 86400, // 24 hours
    }
  );
  res.status(200).json({
    user: user,
    success: true,
    message: "logged in successfully",
    token,
  });
});

module.exports = {
  createUser,
  getUser,
};
