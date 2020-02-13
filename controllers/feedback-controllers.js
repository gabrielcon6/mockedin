const fs = require('fs');
const uuid = require('uuid/v4');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Feedback = require('../models/feedback');
const User = require('../models/user');

const getFeedbackById = async (req, res, next) => {
  const FeedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await feedback.findById(FeedbackId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a feedback.',
      500
    );
    return next(error);
  }

  if (!feedback) {
    const feedback = new HttpError(
      'Could not find feedback for the provided id.',
      404
    );
    return next(feedback);
  }

  res.json({ feedback: feedback.toObject({ getters: true }) });
};

const getFeedbackByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithFeedback;
  try {
    userWithFeedback = await User.findById(userId).populate({path: 'feedback'});;
  } catch (err) {
    const error = new HttpError(
      'Fetching Feedbacks failed, please try again later.',
      500
    );
    return next(error);
  }
  if (!userWithFeedback) {
    return next(
      new HttpError('Could not find Feedbacks for the provided user id.', 404)
    );
  }

  res.json({

    feedback: userWithFeedback
    
  });
};

const createFeedback = async (req, res, next) => {
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
      'Creating feedback failed, please try again.',
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
    await createdFeedback.save({ session: sess });
    user.Feedbacks.push(createdFeedback);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating feedback failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ feedback: createdFeedback });
};

const updateFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { aboutFeedback, educationFeedback, experienceFeedback, strength} = req.body;
  const FeedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await feedback.findById(FeedbackId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update feedback.',
      500
    );
    return next(error);
  }

  if (feedback.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this feedback.', 401);
    return next(error);
  }

  feedback.aboutFeedback = aboutFeedback;
  feedback.educationFeedback = educationFeedback;
  feedback.experienceFeedback = experienceFeedback;
  feedback.strength = strength;

  try {
    await feedback.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update feedback.',
      500
    );
    return next(error);
  }

  res.status(200).json({ feedback: feedback.toObject({ getters: true }) });
};

const deleteFeedback = async (req, res, next) => {
  const FeedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await feedback.findById(FeedbackId);
  } catch (err) {
    const error = new HttpError(
      '201 - Something went wrong, could not delete feedback.',
      500
    );
    return next(error);
  }

  if (!feedback) {
    const error = new HttpError('Could not find feedback for this id.', 404);
    return next(error);
  }

  if (feedback.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      `You are not allowed to delete this feedback.`,
      401
    );
    return next(error);
  }

  try {
    await feedback.remove();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    feedback.creator.feedbacks.pull(feedback); //feedback OR FeedbacksS????
    await feedback.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      '229 - Something went wrong, could not delete feedback.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted feedback.' });

};

exports.getFeedbackById = getFeedbackById;
exports.getFeedbackByUserId = getFeedbackByUserId;
exports.createFeedback = createFeedback;
exports.updateFeedback = updateFeedback;
exports.deleteFeedback = deleteFeedback;
