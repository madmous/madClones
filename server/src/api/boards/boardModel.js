const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const BoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isClosed: {
    type: Boolean
  },
  createdAt: {
    type: Date
  }
});

module.exports = mongoose.model('Board', BoardSchema);