import mongoose from 'mongoose';

import { CardItemSchema } from '../cardItem/cardItemModel';

const Schema = mongoose.Schema;

export const CardItemsSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  cardItems: [CardItemSchema]
});

export default mongoose.model('CardItems', CardItemsSchema);