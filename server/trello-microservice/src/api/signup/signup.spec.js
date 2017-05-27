'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../models/index';
import { runServer } from '../../../test/index';

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';

const assert = chai.assert;

describe('Signup' , () => {
	let server;

	before(done => {
		runServer(arg => {
			server = arg;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();

		server.close(done);
	});

	describe('/POST', () => {
    
    xit ('should signup - sucess', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				email: 'testEmail@email.com'
			};

			chai.request(server)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});
	});
});
