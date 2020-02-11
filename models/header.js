const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const headerSchema = new Schema({
  name: { type: String },
  fileLink: { type: String },
  s3_key: { type: String },
  jobTitle: { type: String },
  location: { type: String },
  about: { type: String },
  adminComments: { type: String },
  isOk: { type: Boolean },
  creator: { type: mongoose.Types.ObjectId, required: true, unique: true,  ref: 'User' }
},
{
  timestamps: true
});

headerSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Header', headerSchema);