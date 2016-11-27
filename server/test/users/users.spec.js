'use strict';

const chaiHttp = require('chai-http');
const chai     = require('chai');

const app = require ('../../src/index');
const log	= require ('../../src/libs/winston')(module);

const assert = chai.assert;

let objectId;
let token;

chai.use(chaiHttp);

const usersUrl = '/api/v1/users/';

let users = []; 

describe('User rest service ' + usersUrl, function () {

	it ('GET /', function (done) {
		chai.request(app)
			.get(usersUrl)
			.end(function(err, res) {
				users = res.body.data.users;
				log.info('--> ' + users.length)
	    	assert.equal(res.statusCode, '200', 'statusCode is 200');
				done();
			});
	});

	/*it ('GET /:id', function (done) {
		chai.request(app)
			.get(usersUrl + users[0]._id)
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode is 200');   	
				done();
			});
	});

	/*it ('GET /:id/organizations', function (done) {
		chai.request(app)
			.get(usersUrl + users[0]._id + '/organizations')
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode is 200');   	
				done();
			});
	});

	/*it ('GET /:id/organizations/:idOrganization/boards', function (done) {
		chai.request(app)
			.get(users + '5831a5717c2af31989284082/organizations/5831a5947c2af31989284083/boards')
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode is 200');   	
				done();
			});
	});*/

	/*it ('POST /api/users/ ', function (done) {
		chai.request(app)
			.post('/api/users/')
			.send({name: 'chaiTestUser', password: 'chaiTestPassword'})
			.end(function(err, res) {
				assert.equal(res.type, 'application/json', 'res is a json');
	    	assert.equal(res.status, '200', 'status equals 200');
	    	assert.equal(res.statusCode, '200', 'statusCode equals 200');

				objectId = res.body.id;

				done();
			});
	});

	it ('GET /api/users ', function (done) {
		chai.request(app)
      .get('/api/users')
      .set('Authorization', token)
      .end(function(err, res) {
        assert.equal(res.statusCode, '200', 'statusCode equals 200');
        assert.isNotNull(res.body.length, 'the body contains ' + res.body.length + ' users');

        done();
      });
	});

	it ('GET /api/users/:id ', function (done) {
		chai.request(app)
			.get('/api/users/' + objectId)
			.set('Authorization', token)
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode equals 200');
	    	assert.equal(res.body.user.name, 'chaiTestUser', 'the body contains a user named chaiTestUser');
	    	assert.equal(res.body.user._id, objectId, 'the body contains a user id ${objectId}');

	    	done();
			});
	});

	it ('PUT /api/users/:id ', function (done) {
		chai.request(app)
			.put('/api/users/' + objectId)
			.send({name : 'chaiTestUserModified'})
			.set('Authorization', token)
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode equals 200');

				done();
			});
	});

	it ('DELETE /api/users/:id ', function (done) {
		chai.request(app)
			.delete('/api/users/'+ objectId)
			.set('Authorization', token)
			.end(function(err, res) {
	    	assert.equal(res.statusCode, '200', 'statusCode equals 200');

				done();
			});
	});*/
});