const fs = require('fs');
const uuid = require('uuid/v4');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Feedback = require('../models/feedback');
const User = require('../models/user');

const getFeedbackById = async (req, res, next) => {
  const otherId = req.params.oid;

  let feedback;
  try {
    feedback = await feedback.findById(otherId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!feedback) {
    const feedback = new HttpError(
      'Could not find other for the provided id.',
      404
    );
    return next(feedback);
  }

  res.json({ feedback: feedback.toObject({ getters: true }) });
};

const getOtherByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithFeedback;
  try {
    userWithFeedback = await User.findById(userId).populate({path: 'feedback'});;
  } catch (err) {
    const error = new HttpError(
      'Fetching others failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!userWithFeedback) {
    return next(
      new HttpError('Could not find others for the provided user id.', 404)
    );
  }

  res.json({

    feedback: userWithFeedback
    
  });
};

const createOther = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { aboutFeedback, educationFeedback, experienceFeedback, strength} = req.body;

  const createdFeedback = new Feedback({
    id: uuid(), 
    aboutFeedback,
    educationFeedback,
    experienceFeedback,
    strength,
    creator: req.userData.userId
  });
// ------------------------------------------------------------------------------------------------------------
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
    await createdOther.save({ session: sess });
    user.others.push(createdOther);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
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
  res.status(201).json({ other: createdOther });
};

const updateOther = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { type, title, startDate, endDate } = req.body;
  const otherId = req.params.oid;

  let other;
  try {
    other = await Other.findById(otherId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  if (other.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this other.', 401);
    return next(error);
  }

  other.type = type;
  other.title = title;
  other.startDate = startDate;
  other.endDate = endDate;

  // other.adminComments = adminComments;

  try {
    await other.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update other.',
      500
    );
    return next(error);
  }

  res.status(200).json({ other: other.toObject({ getters: true }) });
};

const deleteOther = async (req, res, next) => {
  const otherId = req.params.oid;

  let other;
  try {
    other = await Other.findById(otherId);
  } catch (err) {
    const error = new HttpError(
      '201 - Something went wrong, could not delete other.',
      500
    );
    return next(error);
  }

  if (!other) {
    const error = new HttpError('Could not find other for this id.', 404);
    return next(error);
  }

  if (other.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      `You are not allowed to delete this other.`,
      401
    );
    return next(error);
  }

  try {
    await other.remove();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    other.creator.others.pull(other); //other OR othersS????
    await other.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      '229 - Something went wrong, could not delete other.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted other.' });

};

exports.getOtherById = getOtherById;
exports.getOtherByUserId = getOtherByUserId;
exports.createOther = createOther;
exports.updateOther = updateOther;
exports.deleteOther = deleteOther;
