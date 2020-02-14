const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  aboutFeedback: { type: String },
  educationFeedback: { type: String },
  experienceFeedback: { type: String },
  strength: { type: Number },
  creator: { type: mongoose.Types.ObjectId, required: true, unique: true, ref: 'User' }
},
{
  timestamps: true
});

feedbackSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Feedback', feedbackSchema);