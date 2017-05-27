'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import {
	organizationModel,
  boardModel,
  userModel
} from '../../models/index';

import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const homeUrl = '/api/home/';

const assert = chai.assert;

describe('Home' , () => {
	let server;
	let stub;

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
      name: 'test',
      fullname: 'test fn',
      email: 'test@email.com',
      organizations : [organization],
      boards: [board]
    });

		prepareServer(userTest, true, (arg1, arg2) => {
			server = arg1;
			stub = arg2;

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