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
var assert = _chai2.default.assert;

describe('Signup', function () {

	after(function (done) {
		_index.userModel.find().remove().exec();

		done();
	});

	describe('/POST', function () {

		it('should signup - sucess', function (done) {
			var user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			_chai2.default.request(_index3.default).post(signupUrl).send(user).end(function (err, res) {
				assert.equal(res.status, '200', 'status equals 200');

				done();
			});
		});
	});
});