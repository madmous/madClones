import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const BoardStarSchema = new Schema({
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

export default mongoose.model('BoardStar', BoardStarSchema);