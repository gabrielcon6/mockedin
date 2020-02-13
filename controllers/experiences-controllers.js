const fs = require('fs');
const uuid = require('uuid/v4');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Experience = require('../models/experience');
const User = require('../models/user');

const getExperienceById = async (req, res, next) => {
  const experienceId = req.params.exid;

  let experience;
  try {
    experience = await Experience.findById(experienceId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not find a place.',
      500
    );
    return next(error);
  }

  if (!experience) {
    const error = new HttpError(
      'Could not find experience for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ experience: experience.toObject({ getters: true }) });
};

const getExperienceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let userWithExperience;
  try {
    userWithExperience = await User.findById(userId).populate({path: 'experiences', options: { sort: { 'startDate': 'desc' } }});
  } catch (err) {
    const error = new HttpError(
      'Fetching experiences failed, please try again later.',
      500
    );
    return next(error);
  }
  // let userWithExperience;
  // try {
  //   userWithExperience = await Experience.find( { creator: userId } );
  // } catch (err) {
  //   const error = new HttpError(
  //     'Fetching places failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }

  // if (!userWithExperience || userWithExperience.experience.length === 0) {
  if (!userWithExperience) {
    return next(
      new HttpError('Could not find experiences for the provided user id.', 404)
    );
  }

  res.json({
    // experience: userWithExperience.experience.map(experience =>
    //   experience.toObject({ getters: true })
    // )

    experience: userWithExperience
    
  });
};

const createExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, company, startDate, endDate, description } = req.body;

  const createdExperience = new Experience({
    id: uuid(), 
    title,
    company,
    startDate,
    endDate,
    description: description,
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
    await createdExperience.save({ session: sess });
    user.experiences.push(createdExperience);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Creating place failed, please try again.',
      500
    );
    return next(error);
  }

  //BELOW IS IF WE WANT TO CREATE experience MANUALLY VIA POSTMAN
  // try {
  //   await createdExperience.save();
  // } catch (err) {
  //   const error = new HttpError(
  //     'Signing up failed, please try again later.',
  //     500
  //   );
  //   return next(error);
  // }
  res.status(201).json({ experience: createdExperience });
};

const updateExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, company, startDate, endDate, description } = req.body;
  const experienceId = req.params.exid;

  let experience;
  try {
    experience = await Experience.findById(experienceId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update place.',
      500
    );
    return next(error);
  }

  if (experience.creator.toString() !== req.userData.userId) {
    const error = new HttpError('You are not allowed to edit this experience.', 401);
    return next(error);
  }

  experience.title = title;
  experience.company = company;
  experience.startDate = startDate;
  experience.endDate = endDate;
  experience.description = description;

  // experience.adminComments = adminComments;

  try {
    await experience.save();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update experience.',
      500
    );
    return next(error);
  }

  res.status(200).json({ experience: experience.toObject({ getters: true }) });
};

const deleteExperience = async (req, res, next) => {
  const experienceId = req.params.exid;
  
  let experience;
  try {
    experience = await Experience.findById(experienceId);
  } catch (err) {
    const error = new HttpError(
      'line 202 Something went wrong, could not delete experience.',
      500
    );
    return next(error);
  }

  if (!experience) {
    const error = new HttpError('Could not find experience for this id.', 404);
    return next(error);
  }

  if (experience.creator.toString() !== req.userData.userId) {
    const error = new HttpError(
      `You are not allowed to delete this experience.`,
      401
    );
    return next(error);
  }

  try {
    await experience.remove();
    const sess = await mongoose.startSession();
    sess.startTransaction();
    experience.creator.experiences.pull(experience); //experience OR ExperiencesS????
    await experience.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'line 231 Something went wrong, could not delete experience. But works',
      // 'Experience successfully deleted',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Deleted experience.' });

};

exports.getExperienceById = getExperienceById;
exports.getExperienceByUserId = getExperienceByUserId;
exports.createExperience = createExperience;
exports.updateExperience = updateExperience;
exports.deleteExperience = deleteExperience;
