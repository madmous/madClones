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

const boardsUrl = '/api/v1/boards/';
const loginUrl = '/api/v1/login/';

const assert   = chai.assert;

describe('Card' , () => {

  let boardStarId = '';
  let boardId = '';
  let cardId = '';
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

	describe('/POST/board', () => {

		it ('should create a personal board - success', done => {
      const organization = {
				name: 'boardName',
			};

			chai.request(app)
				.post(boardsUrl)
				.set('Authorization', `JWT ${token}`)
        .send(organization)
				.end((err, res) => {
          boardId = res.body.data.boards[0]._id;
          
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.boards.length);
					assert.equal('boardName', res.body.data.boards[0].name);

					done();
				});
		});
	});

	describe('/POST/card', () => {

		it ('should create a board card - success', done => {
      const card = {
				name: 'cardName',
			};

			chai.request(app)
				.post(`${boardsUrl}/${boardId}/cards`)
				.set('Authorization', `JWT ${token}`)
        .send(card)
				.end((err, res) => {
          cardId = res.body.data[0]._id;
          
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal('cardName', res.body.data[0].header);
					assert.equal(0, res.body.data[0].cardItems.length);

					done();
				});
		});

		it ('should create a board card - fail', done => {
			chai.request(app)
				.post(`${boardsUrl}/${boardId}/cards`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because card name is missing');
					assert.equal(res.body.data.uiError,'Please enter a card name');

					done();
				});
		});
	});

	describe('/POST/carditem', () => {

		it ('should create a board card item - success', done => {
      const cardItem = {
				name: 'cardItem',
			};

			chai.request(app)
				.post(`${boardsUrl}/${boardId}/cards/${cardId}`)
				.set('Authorization', `JWT ${token}`)
        .send(cardItem)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal(1, res.body.data[0].cardItems.length);
					assert.equal('cardItem', res.body.data[0].cardItems[0].name);

					done();
				});
		});

		it ('should create a board card item - fail', done => {
			chai.request(app)
				.post(`${boardsUrl}/${boardId}/cards/${cardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because card item name is missing');
					assert.equal(res.body.data.uiError,'Please enter a card item name');

					done();
				});
		});
	});

	describe('/POST/boardstars', () => {

		it ('should star a user board - success', done => {
			chai.request(app)
				.post(`${boardsUrl}/${boardId}/boardstars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					boardStarId = res.body.data.starredBoards[0]._id;

					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.starredBoards.length);
					assert.equal('boardName', res.body.data.starredBoards[0].name);
					assert.equal(true, res.body.data.starredBoards[0].isStarredBoard);

					done();
				});
		});

		it ('should star a user board - fail', done => {
			chai.request(app)
				.post(`${boardsUrl}/null/boardStars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/PUT/card', () => {

		it ('should create a board card - fail', done => {
			chai.request(app)
				.put(`${boardsUrl}/${boardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because new card is missing');

					done();
				});
		});
	});

	describe('/GET/card', () => {

		it ('should get user board cards - success', done => {
			chai.request(app)
				.get(`${boardsUrl}/${boardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200');

					done();
				});
		});

		it ('should get user board cards - fail', done => {
			chai.request(app)
				.get(`${boardsUrl}/null`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400',
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/DELETE/boardstars', () => {

		it ('should unstar a starred user board - success', done => {
			chai.request(app)
				.delete(`${boardsUrl}/${boardId}/boardstars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.starredBoards.length);

					done();
				});
		});

		it ('should star a user board - fail', done => {
			chai.request(app)
				.post(`${boardsUrl}/null/boardStars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/DELETE/board', () => {

		it ('should delete a user board - success', done => {
			chai.request(app)
				.delete(`${boardsUrl}/${boardId}`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.boards.length);

					done();
				});
		});
	});
});