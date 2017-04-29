'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../../../src/models/index';
import app from '../../../../src/index';

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';
const assert   = chai.assert;

describe('Signup' , () => {

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/POST', () => {
    
    it ('should signup - sucess', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname'
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});
	});
});
