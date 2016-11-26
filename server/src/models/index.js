let index = {};

index.organizationModel = require ('./organizations/organizationModel');
index.boardStarModel    = require ('./boardStars/boardStarModel');
index.boardModel        = require ('./boards/boardModel');
index.userModel         = require ('./users/userModel');

module.exports = index;