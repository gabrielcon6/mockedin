const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const educationSchema = new Schema({
  school: { type: String },
  degree: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  adminComments: { type: String },
  isOk: { type: Boolean },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Education', educationSchema);