const mongoose = require ('mongoose');

const cardSchema = require ('../card/cardModel').schema;

const Schema = mongoose.Schema;

const CardsSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  boardId: {
    type: Schema.Types.ObjectId,
    required: true
  },
  cards: [cardSchema]
});

module.exports = mongoose.model('Cards', CardsSchema);