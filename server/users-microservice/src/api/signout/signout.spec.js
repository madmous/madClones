'use strict';

import chaiHttp from 'chai-http';
import chai from 'chai';

import { runServer } from '../../../test/index';

chai.use(chaiHttp);

const signoutUrl = '/api/signout';

const assert = chai.assert;

describe('Signout' , () => {
	let server;
	let app;

	before(done => {
		runServer(arg => {
			server = arg;

			done();
		});
  });

	after(done => {
		server.close(done);
	});

	describe('/POST', () => {
    
    it ('should signout - sucess', done => {
			chai.request(server)
				.get(signoutUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal(res.body.data.csrf, '', 'the csrf is empty');
					assert.equal(res.headers['set-cookie'][0].split(';')[0].split('=')[1], '', 'the token is empty');

					done();
				});
		});
	});
});
