const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const boarSchema = require ('../boards/boardModel.js').schema;

const OrganizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  boards: [boardSchema]
});

module.exports = mongoose.model('Organization', OrganizationSchema);