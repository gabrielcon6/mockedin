const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 5 },
  isAdmin: { type: Boolean, required: true },
  experiences: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Experience' }],
  education: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Education' }],
  others: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Other' }]
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);