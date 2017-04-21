import mongoose from 'mongoose';

import { BoardSchema } from '../boards/boardModel';

const Schema = mongoose.Schema;

export const OrganizationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  boards: [BoardSchema]
});

export default mongoose.model('Organization', OrganizationSchema);