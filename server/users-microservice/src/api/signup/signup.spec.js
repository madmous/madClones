'use strict';

import chaiHttp from 'chai-http';
import nock from 'nock';
import chai from 'chai';

import { trelloMicroserviceUrl } from '../../config/config';
import { userModel } from '../../../src/models/index';
import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const signupUrl = '/api/signup';

const assert = chai.assert;

describe('Signup' , () => {
	let server;
	let app;

	before(done => {

		prepareServer(null, (arg1, arg2) => {
			server = arg1;
			app = arg2;

			nock(`${trelloMicroserviceUrl}api/v1/signup/`)
				.post('', {
					name: 'testName',
					fullname: 'testFullname',
					email: 'testEmail@email.com'
				})
				.reply(200);

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		server.close(done);
	});

	describe('/POST', () => {
    
    it ('should signup - sucess', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				initials: 'TFN',
				email: 'testEmail@email.com',
				application: 'test application',
				password: 'testPassword'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.notEqual(res.body.data.csrf, undefined, 'the csrf is defined');
					assert.notEqual(res.headers['set-cookie'], undefined, 'the cookie is defined');
					assert.notEqual(res.headers['set-cookie'][0].split(';')[0].split('=')[1], undefined, 'the token is defined');

					done();
				});
		});
	});
});
