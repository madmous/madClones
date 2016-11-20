const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const BoardStarSchema = new mongoose.Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('BoardStar', BoardStarSchema);