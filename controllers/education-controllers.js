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
    userWithEducation = await User.findById(userId).populate('education');
  } catch (err) {
    const error = new HttpError(
      'Fetching education failed, please try again later.',
      500
    );
    return next(error);
  }
  // let userWithEducation;
  // try {
  //   userWithEducation = await Education.find( { creator: userId } );
  // } catch (err) {
  //   const error = new HttpError(
  //     'Fetching places failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }
  // if (!userWithEducation || userWithEducation.education.length === 0) {
  if (!userWithEducation) {
    return next(
      new HttpError('Could not find education for the provided user id.', 404)
    );
  }
  res.json({
    // education: userWithEducation.education.map(education =>
    //   education.toObject({ getters: true })
    // )
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
  const { school, degree, startDate, endDate } = req.body;
  const createdEducation = new Education({
    id: uuid(), 
    school,
    degree,
    startDate,
    endDate,
    description: '*to be reviewed*',
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
    await createdEducation.save();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    // await createdEducation.save({ session: sess });
    user.education.push(createdEducation);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place education, please try again.',
      500
    );
    return next(error);
  }
  //BELOW IS IF WE WANT TO CREATE Other MANUALLY VIA POSTMAN
  // try {
  //   await createdOther.save();
  // } catch (err) {
  //   const error = new HttpError(
  //     'Signing up failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }
  res.status(201).json({ education: createdEducation });
};
const updateEducation = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }
  const { school, degree, startDate, endDate } = req.body;
  const educationId = req.params.exid;
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
  const educationId = req.params.exid;
  let education;
  try {
    education = await Education.findById(educationId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete education.',
      500
    );
    return next(error);
  }
  if (!education) {
    const error = new HttpError('Could not find education for this id.', 404);
    return next(error);
  }
  if (education.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      `You are not allowed to delete this education.`,
      401
    );
    return next(error);
  }
  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await education.remove({ session: sess });
    education.creator.education.pull(education); 
    await education.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete education.',
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