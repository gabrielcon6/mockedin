const fs = require('fs');
const uuid = require('uuid/v4');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Experience = require('../models/experience');
const User = require('../models/user');

const getExperienceById = async (req, res, next) => {
  const experienceId = req.params.hid;

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
      'Could not find place for the provided id.',
      404
    );
    return next(error);
  }

  res.json({ experience: experience.toObject({ getters: true }) });
};

const getExperienceByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  console.log('%%%%%%%%%user', userId)
  let userWithExperience;
  try {
    userWithExperience = await User.findById(userId).populate('experiences');
    console.log('%%%%%%%%%', userWithExperience)
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
  console.log(userWithExperience);
};

const createExperience = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, company, startDate, endDate } = req.body;

  const createdExperience = new Experience({
    id: uuid(), 
    title,
    company,
    startDate,
    endDate,
    description: '*to be reviewed*',
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
    await createdExperience.save({ session: sess });
    // user.experience.push(createdExperience);
    // await user.save({ session: sess });
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

  const { name, jobTitle, about } = req.body;
  const experienceId = req.params.hid;

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

  experience.name = name;
  experience.jobTitle = jobTitle;
  experience.about = about;
  // experience.image = req.file.path;

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
  const experienceId = req.params.hid;

  let experience;
  try {
    experience = await Experience.findById(experienceId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete experience.',
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
      `You are not allowed to delete this experience.${experience.creator.toString()} // ${req.userData.userId}`,
      401
    );
    return next(error);
  }

  const imagePath = experience.image;

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await experience.remove({ session: sess });
    // experience.creator.experience.pull(experience); //experience OR ExperiencesS????
    // await experience.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not delete experience.',
      500
    );
    return next(error);
  }

  fs.unlink(imagePath, err => {
    console.log(err);
  });

  res.status(200).json({ message: 'Deleted experience.' });

};

exports.getExperienceById = getExperienceById;
exports.getExperienceByUserId = getExperienceByUserId;
exports.createExperience = createExperience;
exports.updateExperience = updateExperience;
exports.deleteExperience = deleteExperience;
