'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _expressValidation = require('express-validation');

var _expressValidation2 = _interopRequireDefault(_expressValidation);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _boardController = require('./boardController');

var _cardController = require('../card/cardController');

var _boardValidation = require('./boardValidation');

var _cardValidation = require('../card/cardValidation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.route('/').post((0, _expressValidation2.default)(_boardValidation.saveUserBoardSchema), _boardController.saveUserBoard);

router.route('/:idBoard').delete((0, _expressValidation2.default)(_boardValidation.removeUserBoardSchema), _boardController.removeUserBoard).put((0, _expressValidation2.default)(_boardValidation.renameBoardNameSchema), _boardController.renameBoardName);

router.route('/:idBoard/cards').get((0, _expressValidation2.default)(_cardValidation.getUserBoardCardsSchema), _cardController.getUserBoardCards).post((0, _expressValidation2.default)(_cardValidation.saveUserBoardCardSchema), _cardController.saveUserBoardCard).put((0, _expressValidation2.default)(_cardValidation.updateUserBoardCardsSchema), _cardController.updateUserBoardCards);

router.route('/:idBoard/cards/:idCard').post((0, _expressValidation2.default)(_cardValidation.saveUserBoardCardItemSchema), _cardController.saveUserBoardCardItem);

router.route('/:idBoard/boardstars').post((0, _expressValidation2.default)(_boardValidation.saveUserBoardStarSchema), _boardController.saveUserBoardStar).delete((0, _expressValidation2.default)(_boardValidation.removeUserBoardStarSchema), _boardController.removeUserBoardStar);

exports.default = router;