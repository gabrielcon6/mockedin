const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, minlength: 5 },
  isAdmin: { type: Boolean, required: true },
  other: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Other' }]
  // header: { type: mongoose.Types.ObjectId, ref: 'Header' }
  // header: [{ type: mongoose.Types.ObjectId, default: {}, ref: 'Header' }]
  // education: { type: mongoose.Types.ObjectId, ref: 'Education' },
  // experience: { type: mongoose.Types.ObjectId, ref: 'Experience' },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);