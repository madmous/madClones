'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';

import {
	organizationModel,
  boardModel,
  userModel
} from '../../../../src/models/index';

import app from '../../../../src/index';

chai.use(chaiHttp);

const loginUrl = '/api/v1/login/';
const assert   = chai.assert;

describe('Login' , () => {

  before(done => {
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

    userTest.save(err => {
      done();
    });
  });

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/POST', () => {

		it ('should login - success', done => {
			chai.request(app)
				.post(loginUrl)
				.auth('testName', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it ('should login - fail', done => {
			chai.request(app)
				.post(loginUrl)
				.auth('testName')
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401 because second argument is missing');

					done();
				});
		});

		it ('should login - fail', done => {
			chai.request(app)
				.post(loginUrl)
				.auth('name', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401 because username is invalid');

					done();
				});
		});

    it ('should login - fail', done => {
			chai.request(app)
				.post(loginUrl)
				.auth('testName', 'password')
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401 because password is invalid');

					done();
				});
		});

    it ('should login - fail', done => {
			chai.request(app)
				.post(loginUrl)
				.end((err, res) => {
					assert.equal(res.status, '401', 'status equals 401 because arguments are missing');

					done();
				});
		});
	});
});