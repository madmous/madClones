const mongoose = require ('mongoose');
const bcrypt   = require ('bcrypt');

const Schema = mongoose.Schema;

const BoardStarSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('BoardStar', BoardStarSchema);