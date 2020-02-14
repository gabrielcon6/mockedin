const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const educationSchema = new Schema({
  school: { type: String },
  degree: { type: String },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Education', educationSchema);