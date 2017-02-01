'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const userModel = require('../../src/models/index').userModel;

const log = require('../../src/libs/winston')(module);
const app	= require('../../src/index');

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';
const userUrl 	= '/api/v1/users/';
const assert 	 	= chai.assert;

describe('Users' , () => {

	let token = '';

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	it ('should signup successfully', done => {
		const user = {
			name: 'testName',
			fullname: 'testFullname',
			password: 'testPassword',
			initials: 'testInitials',
			email: 'testEmail@email.com'
		};

		chai.request(app)
			.post(signupUrl)
			.send(user)
			.end((err, res) => {
				assert.equal(res.status, '200', 'status equals 200');
					token = res.body.data.token;
				done();
			});
	});

	describe('/GET', () => {
  
		it ('should get user successfully', done => {
			chai.request(app)
				.get(userUrl)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data.user, undefined, 'The response contains the user object');
					assert.notEqual(res.body.data.user._id, undefined, 'User has an id value');
					assert.equal(res.body.data.user.fullname, 'testFullname', 'User fullname is testFullname');

					done();
				});
		});

		it ('should get user unsuccessfully', done => {
			chai.request(app)
				.get(userUrl)
				.set('Authorization', `JWT`)
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401');

					done();
				});
		});
	});

	describe('/PUT', () => {
  
		it ('should update user successfully', done => {
			const user = {
				name: 'testNameUpdated',
				fullname: 'testFullnameUpdated',
				initials: 'testInitialsUpdated',
			};
			
			chai.request(app)
				.put(userUrl)
				.set('Authorization', `JWT ${token}`)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data.user._id, undefined, 'User has an id value');
					assert.equal(res.body.data.user.fullname, 'testFullnameUpdated', 'User fullname is testFullnameUpdated');

					done();
				});
		});

		it ('should not update user successfully', done => {
			const user = {
				fullname: 'testFullnameUpdated',
				initials: 'testInitialsUpdated'
			};
			
			chai.request(app)
				.put(userUrl)
				.set('Authorization', `JWT ${token}`)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because name is missing');
					assert.equal(res.body.data.error.missingName, 
							'Please enter your name');

					done();
				});
		});

		it ('should not update user successfully', done => {
			const user = {
				name: 'testNameUpdated',
				initials: 'testInitialsUpdated'
			};
			
			chai.request(app)
				.put(userUrl)
				.set('Authorization', `JWT ${token}`)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because full name is missing');
					assert.equal(res.body.data.error.missingFullName, 
							'Please enter your full name');

					done();
				});
		});

		it ('should not update user successfully', done => {
			const user = {
				name: 'testNameUpdated',
				fullname: 'testFullnameUpdated'
			};
			
			chai.request(app)
				.put(userUrl)
				.set('Authorization', `JWT ${token}`)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because initials are missing');
					assert.equal(res.body.data.error.missingInitials, 
							'Please enter your initials');

					done();
				});
		});

		it ('should not update user successfully', done => {			
			chai.request(app)
				.put(userUrl)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because username, full name and initials are missing');
					assert.equal(res.body.data.error.missingName, 
							'Please enter your name');
					assert.equal(res.body.data.error.missingFullName, 
							'Please enter your full name');
					assert.equal(res.body.data.error.missingInitials, 
							'Please enter your initials');

					done();
				});
		});
	});
});