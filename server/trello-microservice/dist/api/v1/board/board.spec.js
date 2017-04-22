'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _chaiHttp = require('chai-http');

var _chaiHttp2 = _interopRequireDefault(_chaiHttp);

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _index = require('../../../../src/models/index');

var _index2 = require('../../../../src/index');

var _index3 = _interopRequireDefault(_index2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_chai2.default.use(_chaiHttp2.default);

var boardsUrl = '/api/v1/boards/';
var loginUrl = '/api/v1/login/';

var assert = _chai2.default.assert;

describe('Card', function () {

	var boardStarId = '';
	var boardId = '';
	var cardId = '';
	var token = '';

	before(function (done) {
		var userTest = new _index.userModel({
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		});

		userTest.save(function (err) {
			done();
		});
	});

	after(function (done) {
		_index.cardsModel.find().remove().exec();
		_index.userModel.find().remove().exec();

		done();
	});

	it('should login - success', function (done) {
		_chai2.default.request(_index3.default).post(loginUrl).auth('testName', 'testPassword').end(function (err, res) {
			assert.equal(res.status, '200', 'status equals 200');
			token = res.body.data.token;

			done();
		});
	});

	describe('/POST/board', function () {

		it('should create a personal board - success', function (done) {
			var organization = {
				name: 'boardName'
			};

			_chai2.default.request(_index3.default).post(boardsUrl).set('Authorization', 'JWT ' + token).send(organization).end(function (err, res) {
				boardId = res.body.data.boards[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.boards.length);
				assert.equal('boardName', res.body.data.boards[0].name);

				done();
			});
		});
	});

	describe('/POST/card', function () {

		it('should create a board card - success', function (done) {
			var card = {
				name: 'cardName'
			};

			_chai2.default.request(_index3.default).post(boardsUrl + '/' + boardId + '/cards').set('Authorization', 'JWT ' + token).send(card).end(function (err, res) {
				cardId = res.body.data[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal('cardName', res.body.data[0].header);
				assert.equal(0, res.body.data[0].cardItems.length);

				done();
			});
		});
	});

	describe('/POST/carditem', function () {

		it('should create a board card item - success', function (done) {
			var cardItem = {
				name: 'cardItem'
			};

			_chai2.default.request(_index3.default).post(boardsUrl + '/' + boardId + '/cards/' + cardId).set('Authorization', 'JWT ' + token).send(cardItem).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data[0].cardItems.length);
				assert.equal('cardItem', res.body.data[0].cardItems[0].name);

				done();
			});
		});
	});

	describe('/POST/boardstars', function () {

		it('should star a user board - success', function (done) {
			_chai2.default.request(_index3.default).post(boardsUrl + '/' + boardId + '/boardstars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				boardStarId = res.body.data.boardStars[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.boardStars.length);
				assert.equal('boardName', res.body.data.boardStars[0].name);
				assert.equal(true, res.body.data.boardStars[0].isStarredBoard);

				done();
			});
		});

		it('should star a user board - fail', function (done) {
			_chai2.default.request(_index3.default).post(boardsUrl + '/null/boardStars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because board id is not valid');

				done();
			});
		});
	});

	describe('/PUT/card', function () {

		it('should create a board card - fail', function (done) {
			_chai2.default.request(_index3.default).put(boardsUrl + '/' + boardId).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because new card is missing');

				done();
			});
		});
	});

	describe('/GET/card', function () {

		it('should get user board cards - success', function (done) {
			_chai2.default.request(_index3.default).get(boardsUrl + '/' + boardId + '/cards').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200');

				done();
			});
		});

		it('should get user board cards - fail', function (done) {
			_chai2.default.request(_index3.default).get(boardsUrl + '/null').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '404', 'status equals 400 because board id is not valid');

				done();
			});
		});
	});

	describe('/PUT/board', function () {

		it('should rename a personal board name - success', function (done) {
			var renamedBoardName = {
				name: 'renamedBoardName'
			};

			_chai2.default.request(_index3.default).put(boardsUrl + '/' + boardId).set('Authorization', 'JWT ' + token).send(renamedBoardName).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');

				done();
			});
		});
	});

	describe('/DELETE/boardstars', function () {

		it('should unstar a starred user board - success', function (done) {
			_chai2.default.request(_index3.default).delete(boardsUrl + '/' + boardId + '/boardstars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(0, res.body.data.boardStars.length);

				done();
			});
		});

		it('should star a user board - fail', function (done) {
			_chai2.default.request(_index3.default).post(boardsUrl + '/null/boardStars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because board id is not valid');

				done();
			});
		});
	});

	describe('/DELETE/board', function () {

		it('should delete a user board - success', function (done) {
			_chai2.default.request(_index3.default).delete(boardsUrl + '/' + boardId).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(0, res.body.data.boards.length);

				done();
			});
		});
	});
});