'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import {
	organizationModel,
  boardModel,
  userModel
} from '../../../../src/models/index';

import prepareServer from '../../../../test/index';

chai.use(chaiHttp);

const homeUrl = '/api/v1/home/';
const assert   = chai.assert;

describe('Home' , () => {
	let server;
	let stub;
	let app;

  before(done => {
		const organizationBoard = new boardModel({
			name: 'boardName'
		})

    const organization = new organizationModel({
      name: 'orgName',
      displayName: 'orgDisplayName',
			board: [organizationBoard]
    });

    const board = new boardModel({
      name: 'boardName'
    });

    const userTest = new userModel({
      name: 'testName',
      fullname: 'testFullname',
      email: 'testEmail@email.com',
      organizations : [organization],
      boards: [board]
    });

		prepareServer(userTest, (arg1, arg2, arg3) => {
			server = arg1;
			stub = arg2;
			app = arg3;

			done();
		});
  });

	after(done => {
		userModel.find().remove().exec();
		stub.restore();

		server.close(done);
	});

	describe('/GET', () => {

 		it ('should get boards and organizations', done => {
			chai.request(server)
				.get(homeUrl)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal(1, res.body.data.boards.length);
					assert.equal(1, res.body.data.organizations.length);
  				assert.equal(0, res.body.data.boardStars.length);
					done();
				});
		});
  });
})