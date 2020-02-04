const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Header = require('../models/header');
const User = require('../models/user');

const getHeaderById = async (req, res, next) => {
  const headerId = req.params.hid;

  let header;
  try {
    header = await Header.findById(headerId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!header) {
    const error = new HttpError(
      'Could not find place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ header: header.toObject({ getters: true }) });
};

const getHeaderByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithHeader;
  try {
    userWithHeader = await User.findById(userId).populate('header');
  } catch (err) {
    const error = new HttpError(
      'Fetching places failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithHeader || userWithHeader.header.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({
    header: userWithHeader.header.map(header =>
      header.toObject({ getters: true })
    )
  });
};

const createHeader = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, jobTitle, about, adminComments } = req.body;

  const createdHeader = new Header({
    name,
        // photo: req.file.path,
    photo: "TBA",
    jobTitle,
    about,
    adminComments,
    isOk: false,
    creator: req.userData.userId
  });

  let user;
  try {
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find user for provided id.', 404);
    return next(error);
  }

  console.log(user);

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdHeader.save({ session: sess });
    user.header.push(createdHeader);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  //BELOW IS IF WE WANT TO CREATE HEADER MANUALLY VIA POSTMAN
  // try {
  //   await createdHeader.save();
  // } catch (err) {
  //   const error = new HttpError(
  //     'Signing up failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }
  res.status(201).json({ header: createdHeader });
};

const updateHeader = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, jobTitle, about } = req.body;
  const headerId = req.params.hid;

  let header;
  try {
    header = await Header.findById(headerId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  if (header.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this header.', 401);
    return next(error);
  }

  header.name = name;
  header.jobTitle = jobTitle;
  header.about = about;
  // header.adminComments = adminComments;

  try {
    await header.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update header.',
      500
    );
    return next(error);
  }

  res.status(200).json({ header: header.toObject({ getters: true }) });
};

const deleteHeader = async (req, res, next) => {
  const headerId = req.params.hid;

  let header;
  try {
    header = await Header.findById(headerId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete header.',
      500
    );
    return next(error);
  }

  if (!header) {
    const error = new HttpError('Could not find header for this id.', 404);
    return next(error);
  }

  if (header.creator.id !== req.userData.userId) {
    const error = new HttpError(
      'You are not allowed to delete this header.',
      401
    );
    return next(error);
  }

  // const imagePath = header.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await header.remove({ session: sess });
    header.creator.header.pull(header); //HEADER OR HEADERS????
    await header.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete header.',
      500
    );
    return next(error);
  }

  // fs.unlink(imagePath, err => {
  //   console.log(err);
  // });

  res.status(200).json({ message: 'Deleted header.' });
};

exports.getHeaderById = getHeaderById;
exports.getHeaderByUserId = getHeaderByUserId;
exports.createHeader = createHeader;
exports.updateHeader = updateHeader;
exports.deleteHeader = deleteHeader;
