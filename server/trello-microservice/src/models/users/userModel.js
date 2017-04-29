import mongoose from 'mongoose';

import { OrganizationSchema } from '../organizations/organizationModel';
import { BoardStarSchema } from '../boardStars/boardStarModel';
import { BoardSchema } from '../boards/boardModel';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  boards: [BoardSchema],
  organizations: [OrganizationSchema],
  boardStars: [BoardStarSchema]
});

export default mongoose.model('User', UserSchema);