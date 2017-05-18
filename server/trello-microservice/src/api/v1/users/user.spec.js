'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import { userModel } from '../../../../src/models/index';

import prepareServer from '../../../../test/index';

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';
const userUrl 	= '/api/v1/users/';

const assert = chai.assert;

describe('Users' , () => {
	let server;
	let stub;
	let app;

  before(done => {
		const userTest = new userModel({
      name: 'test',
			fullname: 'testFullname',
			email: 'test@email.com'
    });

		prepareServer(userTest, (arg1, arg2, arg3) => {
			server = arg1;
			stub = arg2;
			app = arg3;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		stub.restore();

		server.close(done);
	});

	describe('/GET', () => {

 		it ('should get user', done => {
			chai.request(app)
				.get(userUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data, undefined, 'The response contains the user object');
					assert.notEqual(res.body.data._id, undefined, 'User has an id value');
					assert.equal(res.body.data.fullname, 'testFullname', 'User fullname is testFullname');

					done();
				});
		});
  });

	describe('/PUT', () => {

		it ('should update user', done => {
			const user = {
				name: 'testUpdated',
				fullname: 'testFullnameUpdated',
				email: 'testUpdated@email.com'
			};
			
			chai.request(app)
				.put(userUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data._id, undefined, 'User has an id value');
					assert.equal(res.body.data.fullname, 'testFullnameUpdated', 'User fullname is testFullnameUpdated');

					done();
				});
		});
	});

	describe('/DELETE', () => {
  
		it ('should delete user', done => {
			chai.request(app)
				.delete(userUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					userModel.find({name: 'testFullnameUpdated'}, (err, res) => {
						assert.equal(0, res.length, 'No result for name testFullnameUpdated')
					})

					done();
				});
		});
	});
})