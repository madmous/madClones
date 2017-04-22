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

var signupUrl = '/api/v1/signup/';
var userUrl = '/api/v1/users/';
var assert = _chai2.default.assert;

describe('Users', function () {

	var token = '';

	after(function (done) {
		_index.userModel.find().remove().exec();

		done();
	});

	it('should signup - success', function (done) {
		var user = {
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		};

		_chai2.default.request(_index3.default).post(signupUrl).send(user).end(function (err, res) {
			assert.equal(res.status, '200', 'status equals 200');
			token = res.body.data;

			done();
		});
	});

	describe('/GET', function () {

		it('should get user - success', function (done) {
			_chai2.default.request(_index3.default).get(userUrl).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.notEqual(res.body.data.user, undefined, 'The response contains the user object');
				assert.notEqual(res.body.data.user._id, undefined, 'User has an id value');
				assert.equal(res.body.data.user.fullname, 'testFullname', 'User fullname is testFullname');

				done();
			});
		});

		it('should get user - fail', function (done) {
			_chai2.default.request(_index3.default).get(userUrl).set('Authorization', 'JWT').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401');

				done();
			});
		});
	});

	describe('/PUT', function () {

		it('should update user - success', function (done) {
			var user = {
				name: 'testNameUpdated',
				fullname: 'testFullnameUpdated',
				initials: 'testInitialsUpdated'
			};

			_chai2.default.request(_index3.default).put(userUrl).set('Authorization', 'JWT ' + token).send(user).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');
				assert.notEqual(res.body.data.user._id, undefined, 'User has an id value');
				assert.equal(res.body.data.user.fullname, 'testFullnameUpdated', 'User fullname is testFullnameUpdated');

				done();
			});
		});
	});

	describe('/DELETE', function () {

		it('should delete user - success', function (done) {
			_chai2.default.request(_index3.default).delete(userUrl).set('Authorization', 'JWT ' + token).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');

				_index.userModel.find({ name: 'testFullnameUpdated' }, function (err, res) {
					assert.equal(0, res.length, 'No result for name testFullnameUpdated');
				});

				done();
			});
		});

		it('should delete user - fail', function (done) {
			_chai2.default.request(_index3.default).delete(userUrl).set('Authorization', 'JWT').end(function (err, res) {
				assert.equal(res.status, '401', 'status equals 401');

				done();
			});
		});
	});
});