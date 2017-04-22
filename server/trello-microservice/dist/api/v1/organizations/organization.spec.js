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

var organizationsUrl = '/api/v1/organizations';
var loginUrl = '/api/v1/login/';
var homeUrl = '/api/v1/home/';

var assert = _chai2.default.assert;

describe('Organization', function () {

	var organizationBoardId = '';
	var organizationId = '';
	var boardStarId = '';
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

	describe('/POST organization', function () {

		it('should create an organization - success', function (done) {
			var organization = {
				name: 'organizationName',
				displayName: 'organizationDisplayName'
			};

			_chai2.default.request(_index3.default).post(organizationsUrl).set('Authorization', 'JWT ' + token).send(organization).end(function (err, res) {
				organizationId = res.body.data.organizations[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.organizations.length);
				assert.equal(organization.name, res.body.data.organizations[0].name);
				assert.equal(organization.displayName, res.body.data.organizations[0].displayName);

				done();
			});
		});
	});

	describe('/PUT organization', function () {

		it('should update an organization - success', function (done) {
			var organization = {
				name: 'organizationNameUpdated',
				displayName: 'organizationDisplayNameUpdated'
			};

			_chai2.default.request(_index3.default).put(organizationsUrl + '/' + organizationId).set('Authorization', 'JWT ' + token).send(organization).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.organizations.length);
				assert.equal(organization.name, res.body.data.organizations[0].name);
				assert.equal(organization.displayName, res.body.data.organizations[0].displayName);

				done();
			});
		});
	});

	describe('/POST organization board', function () {

		it('should create a board to an organization - success', function (done) {
			var board = {
				name: 'boardName'
			};

			_chai2.default.request(_index3.default).post(organizationsUrl + '/' + organizationId + '/boards').set('Authorization', 'JWT ' + token).send(board).end(function (err, res) {
				organizationBoardId = res.body.data.organizations[0].boards[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.organizations[0].boards.length);
				assert.equal(board.name, res.body.data.organizations[0].boards[0].name);

				done();
			});
		});

		it('should create a board to an organization - fail', function (done) {

			_chai2.default.request(_index3.default).post(organizationsUrl + '/' + organizationId + '/boards').set('Authorization', 'JWT ' + token).send().end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because name is missing');
				assert.equal(res.status, '400', 'Please enter a board name');

				done();
			});
		});
	});

	describe('/PUT organization board', function () {

		it('should update an organization board name - success', function (done) {
			var board = {
				name: 'boardNameUpdated'
			};

			_chai2.default.request(_index3.default).put(organizationsUrl + '/' + organizationId + '/boards/' + organizationBoardId).set('Authorization', 'JWT ' + token).send(board).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');

				done();
			});
		});
	});

	describe('/POST star an organization board', function () {

		it('should star an organization board - success', function (done) {
			_chai2.default.request(_index3.default).post(organizationsUrl + '/' + organizationId + '/boards/' + organizationBoardId + '/boardstars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				boardStarId = res.body.data.boardStars[0]._id;

				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.boardStars.length);
				assert.equal('boardNameUpdated', res.body.data.boardStars[0].name);
				assert.equal('organizationNameUpdated', res.body.data.boardStars[0].organizationName);
				assert.equal(organizationId, res.body.data.boardStars[0].organizationId);
				assert.equal(true, res.body.data.boardStars[0].isStarredBoard);

				done();
			});
		});

		it('should star an organization board - fail', function (done) {
			_chai2.default.request(_index3.default).post(organizationsUrl + '/null/boards/' + organizationBoardId + '/boardStars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because organization id is not valid');

				done();
			});
		});

		it('should star an organization board - fail', function (done) {
			_chai2.default.request(_index3.default).post(organizationsUrl + '/' + organizationId + '/boards/null/boardStars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '400', 'status equals 400 because organization board id is not valid');

				done();
			});
		});
	});

	describe('/DELETE remove a starred organization board', function () {

		it('should star an organization board - success', function (done) {
			_chai2.default.request(_index3.default).delete(organizationsUrl + '/' + organizationId + '/boards/' + organizationBoardId + '/boardStars').set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(0, res.body.data.boardStars.length);

				done();
			});
		});
	});

	describe('/DELETE remove an organization board', function () {

		it('should update a board to an organization - success', function (done) {
			_chai2.default.request(_index3.default).delete(organizationsUrl + '/' + organizationId + '/boards/' + organizationBoardId).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(0, res.body.data.organizations[0].boards.length);

				done();
			});
		});
	});

	describe('/DELETE remove an organization', function () {

		it('should update a board to an organization - success', function (done) {
			_chai2.default.request(_index3.default).delete(organizationsUrl + '/' + organizationId).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(0, res.body.data.organizations.length);

				done();
			});
		});
	});
});