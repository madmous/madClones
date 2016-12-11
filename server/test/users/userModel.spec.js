'use strict';

const chaiHttp = require('chai-http');
const sinon		 = require('sinon');
const chai     = require('chai');

const log	= require ('../../src/libs/winston')(module);

const userModel = require('../../src/models/users/userModel');

const assert = chai.assert;

const dbTest = require('../../src/config/dbTest');

var mongoose = require('mongoose');

require('sinon-mongoose');

describe('User model testing ' , function () {

	describe('Create', function () {

		it('Should call save only once', function (done) {
			const saveStub = sinon.stub();

			const req = {
				body : {
					users : 'Test user from mock'
				}
			};
			
			const next = {};
			const res = {};

			const userController = require('../../src/api/v1/users/userController');
			userController.save = saveStub;

			userController.save(req, res, next);
			sinon.assert.calledOnce(saveStub);

			done();
		});

		it('Should save user', function (done) {
			var userMock = sinon.mock(new userModel({ user: 'Save new user from mock'}));
			var user 	 = userMock.object;

			userMock.expects('save').yields(null, 'SAVED');

			user.save(function(err, result) {
				userMock.verify();
				userMock.restore();
				assert.equal('SAVED', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Read', function () {

		it('Should find user', function (done) {
			const userMock = sinon.mock(userModel);
			
			userMock.expects('find').yields(null, 'USERS');

			userModel.find(function (err, result) {
				userMock.verify();
				userMock.restore();
				assert.equal('USERS', result, "Test fails due to unexpected result")
				done();
			});
		});
	});

	describe('Update', function () {

		it('Should update user', function (done) {
			var userMock = sinon.mock(new userModel({ user: 'Save new user from mock'}));
			var user 	 = userMock.object;

			userMock.expects('save').withArgs({_id: 12345}).yields(null, 'UPDATED');

			user.save({_id: 12345}, function(err, result){
				userMock.verify();
				userMock.restore();
				done();
			})

		});
	});

	describe('Delete', function () {

		it('Should delete a user of a given id', function (done) {
			const userMock = sinon.mock(userModel);

			userMock.expects('remove').withArgs({_id: 12345}).yields(null, 'DELETED');

			userModel.remove({_id: 12345}, function(err, result){
				userMock.verify();
				userMock.restore();
				done();
			})
		});
	});
});