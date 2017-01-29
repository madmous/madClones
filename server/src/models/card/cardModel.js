const mongoose = require ('mongoose');

const cardItemSchema = require ('../cardItem/cardItemModel.js').schema;

const Schema = mongoose.Schema;

const CardItemsSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  cardItems: [cardItemSchema]
});

module.exports = mongoose.model('CardItems', CardItemsSchema);