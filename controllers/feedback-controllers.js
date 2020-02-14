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
    userWithFeedback = await Feedback.find({creator: userId});
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

const updateFeedback = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { aboutFeedback, educationFeedback, experienceFeedback, strength } = req.body;
  const feedbackId = req.params.fid;

  let feedback;
  try {
    feedback = await Feedback.findById(feedbackId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update feedback.',
      500
    );
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


exports.getFeedbackById = getFeedbackById;
exports.getFeedbackByUserId = getFeedbackByUserId;
exports.updateFeedback = updateFeedback;