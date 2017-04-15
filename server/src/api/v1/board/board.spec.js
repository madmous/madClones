'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import chai from 'chai';

import {
  cardsModel,
  userModel
} from '../../../../src/models/index';

import app from '../../../../src/index';

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
		cardsModel.find().remove().exec();
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
	});

	describe('/POST/boardstars', () => {

		it ('should star a user board - success', done => {
			chai.request(app)
				.post(`${boardsUrl}/${boardId}/boardstars`)
				.set('Authorization', `JWT ${token}`)
				.end((err, res) => {
					boardStarId = res.body.data.boardStars[0]._id;

					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(1, res.body.data.boardStars.length);
					assert.equal('boardName', res.body.data.boardStars[0].name);
					assert.equal(true, res.body.data.boardStars[0].isStarredBoard);

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
				.get(`${boardsUrl}/${boardId}/cards`)
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
					assert.equal(res.status, '404',
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/PUT/board', () => {

		it ('should rename a personal board name - success', done => {
      const renamedBoardName = {
				name: 'renamedBoardName',
			};

			chai.request(app)
				.put(`${boardsUrl}/${boardId}`)
				.set('Authorization', `JWT ${token}`)
        .send(renamedBoardName)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

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
					assert.equal(0, res.body.data.boardStars.length);

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