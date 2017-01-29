const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const BoardStarSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  organizationName: {
    type: String
  },
  organizationId: {
    type: Schema.Types.ObjectId
  },
  isStarredBoard: {
    type: Boolean, 
    default: true
  }
});

module.exports = mongoose.model('BoardStar', BoardStarSchema);