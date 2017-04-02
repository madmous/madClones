import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const CardItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

export default mongoose.model('CardItem', CardItemSchema);