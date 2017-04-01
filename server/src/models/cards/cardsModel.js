import mongoose from 'mongoose';

import { CardItemsSchema } from '../card/cardModel';

const Schema = mongoose.Schema;

export const CardsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cards: [CardItemsSchema]
});

export default mongoose.model('Cards', CardsSchema);