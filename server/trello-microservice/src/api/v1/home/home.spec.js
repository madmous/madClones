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

import app from '../../../../src/index';

import { authenticatedWithToken } from '../../../utils/passportMiddleweare';

chai.use(chaiHttp);

const loginUrl = '/api/v1/login/';
const homeUrl = '/api/v1/home/';
const assert   = chai.assert;

describe('Home' , () => {

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

		/*sinon.stub(authenticatedWithToken, function (req, res, next) {
			req.user = userTest;
			
			return next();
		});*/

    userTest.save(err => {
      done();
    });
  });

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/GET', () => {

		it ('should get boards and organizations - success', done => {
			assert.equal(1, 2);
			done();
		});
	});
});