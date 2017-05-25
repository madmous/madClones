'use strict';

import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../../src/models/index';
import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const signinUrl = '/api/signin';

const assert = chai.assert;

describe('Signin' , () => {
	let server;
	let app;

	before(done => {
		const user = new userModel({
			name: 'testName',
			fullname: 'testFullname',
			initials: 'TFN',
			email: 'testEmail@email.com',
			application: 'test application',
			password: 'testPassword'
		});

		prepareServer(user, (arg1, arg2) => {
			server = arg1;
			app = arg2;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		server.close(done);
	});

	describe('/POST', () => {
    
    xit ('should signin - sucess', done => {
			chai.request(app)
				.post(signinUrl)
				.auth('testName', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data.csrf, undefined, 'the csrf is defined');
					assert.notEqual(res.headers['set-cookie'], undefined, 'the cookie is defined');
					assert.notEqual(res.headers['set-cookie'][0].split(';')[0].split('=')[1], undefined, 'the token is defined');

					done();
				});
		});

		it ('should signin - fail', done => {
			chai.request(app)
				.post(signinUrl)
				.auth('testNames', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '404', 'that user does not exist');

					done();
				});
		});

		xit ('should signin - fail', done => {
			chai.request(app)
				.post(signinUrl)
				.auth('testName', 'testPasswords')
				.end((err, res) => {
					assert.equal(res.status, '401', 'invalid password');

					done();
				});
		});
	});
});
