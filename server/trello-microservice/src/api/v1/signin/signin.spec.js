'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import { userModel } from '../../../../src/models/index';

chai.use(chaiHttp);

const signinUrl = '/api/v1/signin/';
const assert 	 	= chai.assert;

describe('Signin' , () => {
	let app;

  before(done => {
		const userTest = new userModel({
      name: 'test',
			fullname: 'testFullname',
			email: 'test@email.com'
    });

		app = require('../../../../src/index').default;

    userTest.save(err => {
      done();
    });
  });

	after(done => {
		userModel.find().remove().exec();
		done();
	});

	describe('/GET', () => {

 		it ('should get user', done => {
			chai.request(app)
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