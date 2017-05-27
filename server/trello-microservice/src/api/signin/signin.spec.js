'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import prepareServer from '../../../test/index';
import { userModel } from '../../models/index';

chai.use(chaiHttp);

const signinUrl = '/api/signin/';

const assert = chai.assert;

describe('Signin' , () => {
	let server;

  before(done => {
		const userTest = new userModel({
      name: 'test',
			fullname: 'testFullname',
			email: 'test@email.com'
    });

		prepareServer(userTest, false, (arg1, arg2) => {
			server = arg1;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		server.close(done);
	});

	describe('/GET', () => {

 		xit ('should get user', done => {
			chai.request(server)
				.get(signinUrl)
				.send({
					name: 'test',
					email: 'test@email.com'
				})
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data, undefined, 'The response contains the user object');
					assert.notEqual(res.body.data._id, undefined, 'User has an id value');
					assert.equal(res.body.data.fullname, 'testFullname', 'User fullname is testFullname');

					done();
				});
		});
  });
})