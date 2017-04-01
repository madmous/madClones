'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../src/models/index';

import app from '../../src/index';

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

	it ('should signup - success', done => {
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
				token = res.body.data;

				done();
			});
	});

	describe('/GET', () => {
  
		it ('should get user - success', done => {
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

		it ('should get user - fail', done => {
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

		it ('should update user - success', done => {
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
	});

	describe('/DELETE', () => {
  
		it ('should delete user - success', done => {
			chai.request(app)
				.delete(userUrl)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					userModel.find({name: 'testFullnameUpdated'}, (err, res) => {
						assert.equal(0, res.length, 'No result for name testFullnameUpdated')
					})

					done();
				});
		});

		it ('should delete user - fail', done => {
			chai.request(app)
				.delete(userUrl)
				.set('Authorization', `JWT`)
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401');

					done();
				});
		});
	});
});