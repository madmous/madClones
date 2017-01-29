const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

const CardItemSchema = new Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('CardItem', CardItemSchema);