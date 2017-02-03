'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const models = require('../../src/models/index');

const organizationModel = models.organizationModel;
const boardStarModel    = models.boardStarModel;
const cardItemModel     = models.cardItemModel;
const boardModel        = models.boardModel;
const cardsModel        = models.cardsModel;
const cardModel         = models.cardModel;
const userModel         = models.userModel;

const log = require('../../src/libs/winston')(module);
const app	= require('../../src/index');

chai.use(chaiHttp);

const loginUrl = '/api/v1/login/';
const homeUrl = '/api/v1/home/';
const assert   = chai.assert;

describe('Home' , () => {

  let token = '';

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
      password: 'testPassword',
      initials: 'testInitials',
      email: 'testEmail@email.com',
      organizations : [organization],
      boards: [board]
    });

    userTest.save(err => {
      done();
    });
  });

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/GET', () => {

    it ('should login - success', done => {
			chai.request(app)
				.post(loginUrl)
				.auth('testName', 'testPassword')
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
          token = res.body.data.token;

					done();
				});
		});

		it ('should get boards and organizations - success', done => {
			chai.request(app)
				.get(homeUrl)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal(1, res.body.data.boards.length);
					assert.equal(1, res.body.data.organizations.length);
					assert.equal(0, res.body.data.starredBoards.length);

					done();
				});
		});

    it ('should get boards and organizations - fail', done => {
			chai.request(app)
				.get(homeUrl)
				.set('Authorization', `JWT`)
				.end((err, res) => {
          log.info(res.body.data);
					assert.equal(res.status, '401', 'status equals 401');

					done();
				});
		});
	});
});