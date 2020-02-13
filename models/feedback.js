const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  aboutFeedback: { type: String },
  educationFeedback: { type: String },
  experienceFeedback: { type: String },
  strength: { type: Integer },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Feedback', feedbackSchema);