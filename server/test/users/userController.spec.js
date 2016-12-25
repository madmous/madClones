'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const log	= require ('../../src/libs/winston')(module);

const organizationModel = require('../../src/models/organizations/organizationModel');
const boardModel		= require('../../src/models/boards/boardModel');
const userModel			= require('../../src/models/users/userModel');
const app				= require('../../src/index');

chai.use(chaiHttp);

const usersUrl = '/api/v1/users/';
const assert   = chai.assert;

describe('User controller testing ' , function () {
	let users = [];

	let userObjectId = null;
	let orgObjectId  = null;
	let boardStarId	 = null;
	let boardId			 = null;

	describe('POST', function () {
		const userTest = {
			name: 'userTestName',
			fullname: 'userTestFullName',
			password: 'usertestPassword',
			initials: 'userTestInitials',
			email: 'userTestEmail@email.com'
		};

		const userOrgTest = {
			name: 'orgName',
			displayName: 'orgDisplayName'
		};

		const userOrgBoardTest = {
			name: 'boardName'
		};

		it (usersUrl, function (done) {
			const userTest = {};

			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl, function (done) {
			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					userObjectId = res.res.body.response.data.id;

					done();
				});
		});

		it (usersUrl, function (done) {

			chai.request(app)
				.post(usersUrl)
				.send(userTest)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boards', function (done) {
			chai.request(app)
				.post(usersUrl + 'gfdg' + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boards', function (done) {
			chai.request(app)
				.post(usersUrl + mongoose.Types.ObjectId() + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/boards')
				.send({})
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					boardId = res.res.body.response.data.id;

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + '7fgdgfdg' + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + mongoose.Types.ObjectId() + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations')
				.send({name: 'name'})
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations')
				.send({displayName: 'displayName'})
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations')
				.send(userOrgTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					orgObjectId = res.res.body.response.data.id;

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + 'fdsdf' + '/organizations/' + orgObjectId + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + 'fdsg' + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId() + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId() + '/boards')
				.send({})
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards')
				.send(userOrgBoardTest)
				.end(function(err, res) {
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					boardId = res.res.body.response.data.id;

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + 'fdsd' + '/organizations/' + orgObjectId + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + 'fdsd' + '/organizations/' + orgObjectId + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + 'fdsfs' + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + 'fdsf' + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId() + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + mongoose.Types.ObjectId() + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard/boardstars', function (done) {
			chai.request(app)
				.post(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + boardId + '/boardstars')
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					boardStarId = res.res.body.response.data.id;

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});
	});

	describe('GET ', function () {

		it (usersUrl, function (done) {
			chai.request(app)
				.get(usersUrl)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');
					
					users = res.res.body.data.users;

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + 'fsfesf')
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + mongoose.Types.ObjectId())
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.get(usersUrl + users[0]._id)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + 'fsfesf' + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + mongoose.Types.ObjectId() + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id/organizations', function (done) {
			chai.request(app)
				.get(usersUrl + users[0]._id + '/organizations')
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					'fsfesf' + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					mongoose.Types.ObjectId() + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					'fdgggfdg' +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					mongoose.Types.ObjectId() +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '400', 'statusCode is 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards', function (done) {
			chai.request(app)
				.get(
					usersUrl + 
					users[0]._id + 
					'/organizations/' +
					users[0].organizations[0]._id +
					'/boards'
				)
				.end(function(err, res) {
					
					if (err != null && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}
					assert.equal(res.status, '200', 'statusCode is 200');

					done();
				});
		});
	});

	describe('PUT', function () {

		const userUpdate = {
			name: 'newTestName', 
			fullname: 'newFullName', 
			initials: 'NI'
		};

		const orgUpdate = {
			name: 'newTestName',
			displayName: 'newDisplayName'
		};

		const boardUpdate = { name: 'newName'};

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId)
				.send({})
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + 'fdfds')
				.send(userUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + mongoose.Types.ObjectId())
				.send(userUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode equals 404');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId)
				.send(userUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + 'dsfsf' + '/organizations/' + orgObjectId)
				.send(orgUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + 'fdsfd')
				.send(orgUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId)
				.send(orgUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId())
				.send(orgUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId)
				.send({})
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId)
				.send({name: 'newName'})
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId)
				.send({dispayName: 'newDisplayName'})
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId)
				.send(orgUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + 'fdsf' + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + 'fdsf' + '/boards/' + boardId)
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + 'fdsf')
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId() + '/boards/' + boardId)
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + mongoose.Types.ObjectId())
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.send()
				.end(function(err, res) {
					assert.equal(res.status, '400', 'statusCode equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.put(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.send(boardUpdate)
				.end(function(err, res) {
					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});
	});

	describe('DELETE', function () {

		it (usersUrl + ':id/boardstars/:idBoardStar', function (done) {
			chai.request(app)
				.delete(usersUrl + 'fdsfds' + '/boardstars/' + boardStarId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boardstars/:idBoardStar', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/boardstars/' + 'fdfs')
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boardstars/:idBoardStar', function (done) {
			chai.request(app)
				.delete(usersUrl + mongoose.Types.ObjectId() + '/boardstars/' + boardStarId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boardstars/:idBoardStar', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/boardstars/' + mongoose.Types.ObjectId())
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/boardstars/:idBoardStar', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/boardstars/' + boardStarId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + 'fdgf' + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + 'dxvv' + '/boards/' + boardId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + 'fdxfxd')
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});		

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId() + '/boards/' + boardId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + mongoose.Types.ObjectId())
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization/boards/:idBoard', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + orgObjectId + '/boards/' + boardId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.delete(usersUrl + mongoose.Types.ObjectId() + '/organizations/' + orgObjectId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + 'gfdgfg')
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + mongoose.Types.ObjectId())
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.delete(usersUrl + 'fdsf' + '/organizations/' + orgObjectId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '400', 'status equals 400');

					done();
				});
		});

		it (usersUrl + ':id/organizations/:idOrganization', function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId + '/organizations/' + orgObjectId)
				.end(function(err, res) {
					
					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.delete(usersUrl + 'fsfesf')
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl + ':id', function (done) {
			chai.request(app)
				.delete(usersUrl + mongoose.Types.ObjectId())
				.end(function(err, res) {
					assert.equal(res.status, '404', 'statusCode is 404');

					done();
				});
		});

		it (usersUrl, function (done) {
			chai.request(app)
				.delete(usersUrl + userObjectId)
				.end(function(err, res) {

					if (err && 'response' in err && 'error' in err.response) {
						log.error(err.response.error.text);
					}

					assert.equal(res.status, '200', 'statusCode equals 200');

					done();
				});
		});
	});

	before(function(done) {
		const userTest = new userModel({
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		});

		const organization = new organizationModel({
			name: 'orgName',
			displayName: 'orgDisplayName',
		});

		const board = new boardModel({
			name: 'boardName'
		});

		userTest.save(function(err) {

			if (!err) {
				userModel.findOne({name: userTest.name}, (err, user) => {

					if (!err) {
						user.organizations.push(organization);

						user.save(function(err) {

							if (!err) {
								userModel.findById(userTest._id, (err, user) => {
									user.organizations[0].boards.push(board);
									user.save();
								});
							}
						});
					}
				});
			}
		});

		done();
	});

	after(function(done) {
		userModel.find().remove().exec();

		done();
	});
});