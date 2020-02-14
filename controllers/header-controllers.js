const fs = require('fs');

const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const HttpError = require('../models/http-error');
const Header = require('../models/header');
const User = require('../models/user');
const multer = require("multer");
const AWS = require("aws-sdk");

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
    userWithHeader = await Header.find( { creator: userId } );
  } catch (err) {
    const error = new HttpError(
      'Fetching header failed, please try again later.',
      500
    );
    return next(error);
  }

  if (!userWithHeader) {
    return next(
      new HttpError('Could not find header for the provided user id.', 404)
    );
  }

  res.json({ header: userWithHeader });
};

const createHeader = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, jobTitle, location, about } = req.body;

  const file = req.file;
  const s3FileURL = "https://s3-ap-southeast-2.amazonaws.com/mockedin-images/"

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2"
  });

  const params = {
    Bucket: "mockedin-images",
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  const createdHeader = new Header({
    name,
    fileLink: s3FileURL + file.originalname,
    s3_key: params.Key,
    jobTitle,
    location,
    about,
    adminComments: '*to be reviewed*',
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
    s3bucket.upload(params, function(err, data) {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
      }
    });

    await createdHeader.save();

  } catch (err) {
    const error = new HttpError(
      'Creating header failed, please try again.',
      500
    );
    return next(error);
  }
  res.status(201).json({ header: createdHeader });
};

const updateHeader = async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { name, jobTitle, location, about } = req.body;
  const headerId = req.params.hid;

  let header;
  try {
    header = await Header.findById(headerId);
    user = await User.findById(req.userData.userId);
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, could not update header.',
      500
    );
    return next(error);
  }

  if (header.creator.toString() !== req.userData.userId && !user.isAdmin) {
    const error = new HttpError('401-You are not allowed to edit this header.', 401);
    return next(error);
  }

  const file = req.file;
  const s3FileURL = "https://s3-ap-southeast-2.amazonaws.com/mockedin-images/"

  const s3bucket = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-southeast-2"
  });

  const params = {
    Bucket: "mockedin-images",
    Key: file.originalname,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: "public-read"
  };

  header.name = name;
  header.jobTitle = jobTitle;
  header.location = location;
  header.about = about;
  header.fileLink = s3FileURL + file.originalname;
  header.s3_key = params.Key;

  try {
    s3bucket.upload(params, function(err, data) {
      if (err) {
        res.status(500).json({ error: true, Message: err });
      } else {
      }
    });
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

exports.getHeaderById = getHeaderById;
exports.getHeaderByUserId = getHeaderByUserId;
exports.createHeader = createHeader;
exports.updateHeader = updateHeader;
