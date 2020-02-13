const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const HttpError = require('../models/http-error');
const Education = require('../models/education');
const User = require('../models/user');

const getEducationById = async (req, res, next) => {
  const educationId = req.params.edid;
  let education;
  try {
    education = await Education.findById(educationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }
  if (!education) {
    const error = new HttpError(
      'Could not find education for the provided id.',
      404
    );
    return next(error);
  }
  res.json({ education: education.toObject({ getters: true }) });
};

const getEducationByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithEducation;
  try {
    userWithEducation = await User.findById(userId).populate({path: 'education', options: { sort: { 'startDate': 'desc' } }});;
  } catch (err) {
    const error = new HttpError(
      'Fetching education failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithEducation) {
    return next(
      new HttpError('Could not find education for the provided user id.', 404)
    );
  }
  res.json({
    education: userWithEducation
  });
};

const createEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { school, degree, startDate, endDate, description } = req.body;
  const createdEducation = new Education({
    school,
    degree,
    startDate,
    endDate,
    description: description ,
    adminComments: 'great!',
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
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await createdEducation.save(); 
    user.education.push(createdEducation); 
    await user.save({ session: sess }); 
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating education went wrong, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ education: createdEducation });
};

const updateEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { school, degree, startDate, endDate, description } = req.body;
  const educationId = req.params.edid;
  let education;
  try {
    education = await Education.findById(educationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }
  if (education.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this education.', 401);
    return next(error);
  }
  education.school = school;
  education.degree = degree;
  education.startDate = startDate;
  education.endDate = endDate;
  education.description = description;
  // education.adminComments = adminComments;
  try {
    await education.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update education.',
      500
    );
    return next(error);
  }
  res.status(200).json({ education: education.toObject({ getters: true }) });
};


const deleteEducation = async (req, res, next) => {
  const educationId = req.params.edid;
  let education;
  try {
    education = await Education.findById(educationId).populate('creator');
  } catch (err) {
    const error = new HttpError(
      '172 - Something went wrong, could not delete education.',
      500
    );
    return next(error);
  }
  if (!education) {
    const error = new HttpError('Could not find education for this id.', 404);
    return next(error);
  }

  if (education.creator._id.toString() !== req.userData.userId) {
    const error = new HttpError(
      `You are not allowed to delete this education.`,
      401
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await education.remove( {session: sess});
    education.creator.education.pull(education); 
    await education.creator.save( {session: sess});
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      '197 - Something went wrong, could not delete education.',
      500
    );
    return next(error);
  }
  res.status(200).json({ message: 'Deleted education.' });
};

exports.getEducationById = getEducationById;
exports.getEducationByUserId = getEducationByUserId;
exports.createEducation = createEducation;
exports.updateEducation = updateEducation;
exports.deleteEducation = deleteEducation;