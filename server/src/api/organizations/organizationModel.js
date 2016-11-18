const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const Schema   = mongoose.Schema;

const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  boards: {
  	type: []
  }
});

module.exports = mongoose.model('Organization', OrganizationSchema);