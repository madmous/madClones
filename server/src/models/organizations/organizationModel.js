const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const boardSchema = require ('../boards/boardModel').schema;

const Schema = mongoose.Schema;

const OrganizationSchema = new Schema({
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