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

var loginUrl = '/api/v1/login/';
var homeUrl = '/api/v1/home/';
var assert = _chai2.default.assert;

describe('Home', function () {

	var token = '';

	before(function (done) {
		var organizationBoard = new _index.boardModel({
			name: 'boardName'
		});

		var organization = new _index.organizationModel({
			name: 'orgName',
			displayName: 'orgDisplayName',
			board: [organizationBoard]
		});

		var board = new _index.boardModel({
			name: 'boardName'
		});

		var userTest = new _index.userModel({
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com',
			organizations: [organization],
			boards: [board]
		});

		userTest.save(function (err) {
			done();
		});
	});

	after(function (done) {
		_index.userModel.find().remove().exec();

		done();
	});

	describe('/GET', function () {

		it('should login - success', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).auth('testName', 'testPassword').end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				token = res.body.data.token;

				done();
			});
		});

		it('should get boards and organizations - success', function (done) {
			_chai2.default.request(_index3.default).get(homeUrl).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.equal(1, res.body.data.boards.length);
				assert.equal(1, res.body.data.organizations.length);
				assert.equal(0, res.body.data.boardStars.length);

				done();
			});
		});

		it('should get boards and organizations - fail', function (done) {
			_chai2.default.request(_index3.default).get(homeUrl).set('Authorization', 'JWT').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401');

				done();
			});
		});
	});
});