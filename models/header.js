const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const headerSchema = new Schema({
  name: { type: String },
  image: { type: String },
  jobTitle: { type: String },
  about: { type: String },
  adminComments: { type: String },
  isOk: { type: Boolean },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('Header', headerSchema);