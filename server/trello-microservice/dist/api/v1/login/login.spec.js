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
var assert = _chai2.default.assert;

describe('Login', function () {

	before(function (done) {
		var userTest = new _index.userModel({
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		});

		var organization = new _index.organizationModel({
			name: 'orgName',
			displayName: 'orgDisplayName'
		});

		var board = new _index.boardModel({
			name: 'boardName'
		});

		userTest.save(function (err) {
			done();
		});
	});

	after(function (done) {
		_index.userModel.find().remove().exec();

		done();
	});

	describe('/POST', function () {

		it('should login - success', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).auth('testName', 'testPassword').end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');

				done();
			});
		});

		it('should login - fail', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).auth('testName').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401 because second argument is missing');

				done();
			});
		});

		it('should login - fail', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).auth('name', 'testPassword').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401 because username is invalid');

				done();
			});
		});

		it('should login - fail', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).auth('testName', 'password').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401 because password is invalid');

				done();
			});
		});

		it('should login - fail', function (done) {
			_chai2.default.request(_index3.default).post(loginUrl).end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401 because arguments are missing');

				done();
			});
		});
	});
});