'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import { userModel } from '../../models/index';

import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const signupUrl = '/api/signup/';
const userUrl 	= '/api/users/';

const assert = chai.assert;

describe('Users' , () => {
	let server;
	let stub;

	before(done => {
		const userTest = new userModel({
      name: 'test',
			fullname: 'test fn',
			email: 'test@email.com'
    });

		prepareServer(userTest, true, (arg1, arg2) => {
			server = arg1;
			stub = arg2;

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
			chai.request(server)
				.get(userUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data, undefined, 'The response contains the user object');
					assert.notEqual(res.body.data._id, undefined, 'User has an id value');
					assert.equal(res.body.data.fullname, 'test fn', 'User full name is test fn');

					done();
				});
		});
  });

	describe('/PUT', () => {

		it ('should update user', done => {
			const user = {
				name: 'test updated',
				fullname: 'test fn updated',
				email: 'testupdated@email.com'
			};
			
			chai.request(server)
				.put(userUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data._id, undefined, 'User has an id value');
					assert.equal(res.body.data.fullname, user.fullname, `User full name is ${user.fullname}`);

					done();
				});
		});
	});

	describe('/DELETE', () => {
  
		it ('should delete user', done => {
			chai.request(server)
				.delete(userUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					userModel.find({name: 'test fn updated'}, (err, res) => {
						assert.equal(0, res.length, 'No result for name test fn updated')
					})

					done();
				});
		});
	});
})