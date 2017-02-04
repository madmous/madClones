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

const organizationsUrl = '/api/v1/organizations/';
const loginUrl = '/api/v1/login/';
const homeUrl = '/api/v1/home/';

const assert   = chai.assert;

describe('Organization' , () => {

  let organizationBoardId = '';
  let organizationId = '';
  let boardStarId = '';
  let token = '';

  before(done => {
    const userTest = new userModel({
      name: 'testName',
      fullname: 'testFullname',
      password: 'testPassword',
      initials: 'testInitials',
      email: 'testEmail@email.com'
    });

    userTest.save(err => {
      done();
    });
  });

	after(done => {
		userModel.find().remove().exec();

		done();
	});

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

	describe('/POST organization', () => {

		it ('should create an organization - success', done => {
      const organization = {
				name: 'organizationName',
				displayName: 'organizationDisplayName'
			};

			chai.request(app)
				.post(organizationsUrl)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
          organizationId = res.body.data.organizations[0]._id;
          
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.organizations.length);
					assert.equal(organization.name, res.body.data.organizations[0].name);
					assert.equal(organization.displayName, res.body.data.organizations[0].displayName);

					done();
				});
		});

    it ('should create an organization - fail', done => {
      const organization = {
				displayName: 'organizationDisplayName'
			};

			chai.request(app)
				.post(organizationsUrl)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name is missing');
					assert.equal(res.body.data.uiError.missingName, 
							'Please enter an organization name');

					done();
				});
		});

    it ('should create an organization - fail', done => {
      const organization = {
        name: 'organizationName'
			};

			chai.request(app)
				.post(organizationsUrl)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because display name is missing');
					assert.equal(res.body.data.uiError.missingDisplayName, 
							'Please enter an organization display name');

					done();
				});
		});

    it ('should create an organization - fail', done => {
			chai.request(app)
				.post(organizationsUrl)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name and display name are missing');
          assert.equal(res.status, '400', 
							'Please enter an organization name');
					assert.equal(res.body.data.uiError.missingDisplayName, 
							'Please enter an organization display name');

					done();
				});
		});
	});

	describe('/PUT organization', () => {

    it ('should update an organization - success', done => {
      const organization = {
				name: 'organizationNameUpdated',
				displayName: 'organizationDisplayNameUpdated'
			};

			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}`)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.organizations.length);
					assert.equal(organization.name, res.body.data.organizations[0].name);
					assert.equal(organization.displayName, res.body.data.organizations[0].displayName);

					done();
				});
		});

    it ('should update an organization - fail', done => {
      const organization = {
				displayName: 'organizationDisplayNameUpdated'
			};

			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}`)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name is missing');
					assert.equal(res.body.data.uiError.missingName, 
							'Please enter an organization name');

					done();
				});
		});

    it ('should update an organization - fail', done => {
      const organization = {
				name: 'organizationNameUpdated'
			};

			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}`)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because display name is missing');
					assert.equal(res.body.data.uiError.missingDisplayName, 
							'Please enter an organization display name');

					done();
				});
		});


    it ('should update an organization - fail', done => {
			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name and display name are missing');
          assert.equal(res.status, '400', 
							'Please enter an organization name');
					assert.equal(res.body.data.uiError.missingDisplayName, 
							'Please enter an organization display name');

					done();
				});
		});
	});

	describe('/POST organization board', () => {

		it ('should create a board to an organization - success', done => {
      const board = {
				name: 'boardName',
			};

			chai.request(app)
				.post(`${organizationsUrl}/${organizationId}/boards`)
				.set('Authorization', `JWT ${token}`)
        .send(board)
				.end((err, res) => {
					organizationBoardId = res.body.data.organizations[0].boards[0]._id;

					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.organizations[0].boards.length);
					assert.equal(board.name, res.body.data.organizations[0].boards[0].name);

					done();
				});
		});

		it ('should create a board to an organization - fail', done => {

			chai.request(app)
				.post(`${organizationsUrl}/${organizationId}/boards`)
				.set('Authorization', `JWT ${token}`)
        .send()
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name is missing');
					assert.equal(res.status, '400', 
							'Please enter a board name');

					done();
				});
		});
	});

	describe('/PUT organization board', () => {

		it ('should update a board to an organization - success', done => {
      const board = {
				name: 'boardNameUpdated',
			};

			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}/boards/${organizationBoardId}`)
				.set('Authorization', `JWT ${token}`)
        .send(board)
				.end((err, res) => {
					organizationBoardId = res.body.data.organizations[0].boards[0]._id;

					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.organizations[0].boards.length);
					assert.equal(board.name, res.body.data.organizations[0].boards[0].name);

					done();
				});
		});

		it ('should update a board to an organization - success', done => {
			chai.request(app)
				.put(`${organizationsUrl}/${organizationId}/boards/${organizationBoardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because name is missing');
          assert.equal(res.status, '400', 
							'Please enter a board name');

					done();
				});
		});
	});

	describe('/POST star an organization board', () => {

		it ('should star an organization board - success', done => {
			chai.request(app)
				.post(`${organizationsUrl}/${organizationId}/boards/${organizationBoardId}/boardstars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					boardStarId = res.body.data.starredBoards[0]._id;

					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.starredBoards.length);
					assert.equal('boardNameUpdated', res.body.data.starredBoards[0].name);
					assert.equal('organizationNameUpdated', res.body.data.starredBoards[0].organizationName);
					assert.equal(organizationId, res.body.data.starredBoards[0].organizationId);
					assert.equal(true, res.body.data.starredBoards[0].isStarredBoard);

					done();
				});
		});

		it ('should star an organization board - fail', done => {
			chai.request(app)
				.post(`${organizationsUrl}/null/boards/${organizationBoardId}/boardStars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because organization id is not valid');

					done();
				});
		});

		it ('should star an organization board - fail', done => {
			chai.request(app)
				.post(`${organizationsUrl}/${organizationId}/boards/null/boardStars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because organization board id is not valid');

					done();
				});
		});
	});

	describe('/DELETE remove a starred organization board', () => {

		it ('should star an organization board - success', done => {
			chai.request(app)
				.delete(`${organizationsUrl}/${organizationId}/boards/${organizationBoardId}/boardStars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.starredBoards.length);

					done();
				});
		});
	});

	describe('/DELETE remove an organization board', () => {

		it ('should update a board to an organization - success', done => {
			chai.request(app)
				.delete(`${organizationsUrl}/${organizationId}/boards/${organizationBoardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.organizations[0].boards.length);

					done();
				});
		});
	});

	describe('/DELETE remove an organization', () => {

		it ('should update a board to an organization - success', done => {
			chai.request(app)
				.delete(`${organizationsUrl}/${organizationId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.organizations.length);

					done();
				});
		});
	});
});