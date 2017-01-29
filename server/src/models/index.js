let index = {};

index.organizationModel = require ('./organizations/organizationModel');
index.boardStarModel    = require ('./boardStars/boardStarModel');
index.cardItemModel     = require ('./cardItem/cardItemModel');
index.boardModel        = require ('./boards/boardModel');
index.cardsModel        = require ('./cards/cardsModel');
index.cardModel         = require ('./card/cardModel');
index.userModel         = require ('./users/userModel');

module.exports = index;