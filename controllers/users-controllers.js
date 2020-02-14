const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail')

const HttpError = require('../models/http-error');
const User = require('../models/user');
const Feedback = require('../models/feedback');

sgMail.setApiKey(process.env.sendgridAPIKey)

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, '-password');
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }
  res.json({ users: users.map(user => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      422
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    const error = new HttpError(
      'Could not create user, please try again.',
      500
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password: hashedPassword,
    isAdmin: false,
    others: [],
    experiences: [],
    education: []
  });

  try {
    await createdUser.save();

    const createdFeedback= new Feedback({
      aboutFeedback: " ",
      educationFeedback: " ",
      experienceFeedback: " ",
      strength: " ",
      creator: createdUser.id
    });

    await createdFeedback.save();

  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createdUser.id, email: createdUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500
    );
    return next(error);
  }

  res
    .status(201)
    .json({ userId: createdUser.id, email: createdUser.email, token: token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;

  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!existingUser) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500
    );
    return next(error);
  }

  res.json({
    userId: existingUser.id,
    email: existingUser.email,
    isAdmin: existingUser.isAdmin,
    token: token
  });
};

const sendAdminEmail = async (req, res, next) => {
  userId = req.params.uid;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  sgMail.send({
    to: 'gabrielcon6cao@gmail.com',
    from: user.email,
    subject: 'I have updated my profile!',
    text: `Hello! I have now updated my MockedIn profile. Thanks, ${user.name}.`
})

  res.status(200).json({ message: 'Email sent.' });
};

const sendUserEmail = async (req, res, next) => {
  userId = req.params.uid;
  adminId = req.params.aid;

  try {
    user = await User.findById(userId);
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  try {
    admin = await User.findById(adminId);
  } catch (err) {
    const error = new HttpError(
      'Fetching users failed, please try again later.',
      500
    );
    return next(error);
  }

  sgMail.send({
    to: user.email,
    from: admin.email,
    subject: 'I have updated my profile!',
    text: `Hello! I have now updated my MockedIn profile. Thanks, ${user.name}.`
})

  res.status(200).json({ message: 'Email sent.' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
exports.sendAdminEmail = sendAdminEmail;
exports.sendUserEmail = sendUserEmail;