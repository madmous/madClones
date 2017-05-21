'use strict';

import chaiHttp from 'chai-http';
import chai from 'chai';

import { userModel } from '../../../src/models/index';
import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const signcheckUrl = '/api/signcheck';
const signinUrl = '/api/signin';

const assert = chai.assert;
const expect = chai.expect;

describe('Signup' , () => {
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

	describe('/GET', () => {
		let csrf;
    
    xit ('should get cookies', done => {
			chai.request(app)
				.post(signinUrl)
				.auth('testName', 'testPassword')
				.end((err, res) => {
					expect(res).to.have.cookie('jwt');
					assert.notEqual(res.body.data.csrf, undefined, 'The token is defined');

					csrf = res.body.data.csrf;

					done();
				});
		});
	});
});
