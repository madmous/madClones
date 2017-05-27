'use strict';

import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../models/index';
import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const signinUrl = '/api/signin';

const assert = chai.assert;

describe('Signin' , () => {
	let server;

	before(done => {
		const user = new userModel({
			name: 'test',
			fullname: 'test fn',
			initials: 'TFN',
			email: 'test@email.com',
			application: 'test application',
			password: 'test'
		});

		prepareServer(user, false, (arg1, arg2) => {
			server = arg1;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		server.close(done);
	});

	describe('/POST', () => {
    
    xit ('should signin - sucess', done => {
			chai.request(server)
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
			chai.request(server)
				.post(signinUrl)
				.auth('testNames', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '404', 'that user does not exist');

					done();
				});
		});

		xit ('should signin - fail', done => {
			chai.request(server)
				.post(signinUrl)
				.auth('testName', 'testPasswords')
				.end((err, res) => {
					assert.equal(res.status, '401', 'invalid password');

					done();
				});
		});
	});
});
