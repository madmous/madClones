'use strict';

import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import chai from 'chai';

import {
  cardsModel,
  userModel
} from '../../models/index';

import prepareServer from '../../../test/index';

chai.use(chaiHttp);

const boardsUrl = '/api/boards/';
const loginUrl = '/api/login/';

const assert = chai.assert;

describe('Board' , () => {

  let boardStarId = '';
  let boardId = '';
  let cardId = '';

	let server;
	let stub;

  before(done => {
    const userTest = new userModel({
      name: 'test',
			fullname: 'testFullname',
			email: 'test@email.com'
    });

		prepareServer(userTest, true, (arg1, arg2) => {
			server = arg1;
			stub = arg2;

			done();
		});
  });

	after(done => {
		cardsModel.find().remove().exec();
		userModel.find().remove().exec();
		stub.restore();

		server.close(done);
	});

	describe('/POST/board', () => {

		it ('should create a personal board - success', done => {
      const organization = {
				name: 'boardName',
			};

			chai.request(server)
				.post(boardsUrl)
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

			chai.request(server)
				.post(`${boardsUrl}${boardId}/cards`)
        .send(card)
				.end((err, res) => {
          cardId = res.body.data.cards[0]._id;
          
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal('cardName', res.body.data.cards[0].header);
					assert.equal(0, res.body.data.cards[0].cardItems.length);

					done();
				});
		});
	});

	describe('/POST/carditem', () => {

		it ('should create a board card item - success', done => {
      const cardItem = {
				name: 'cardItem',
			};

			chai.request(server)
				.post(`${boardsUrl}${boardId}/cards/${cardId}`)
        .send(cardItem)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');
					assert.equal(1, res.body.data.cards[0].cardItems.length);
					assert.equal('cardItem', res.body.data.cards[0].cardItems[0].name);

					done();
				});
		});
	});

	describe('/POST/boardstars', () => {

		it ('should star a user board - success', done => {
			chai.request(server)
				.post(`${boardsUrl}${boardId}/boardstars`)
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
			chai.request(server)
				.post(`${boardsUrl}null/boardStars`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/PUT/card', () => {

		it ('should create a board card - fail', done => {
			chai.request(server)
				.put(`${boardsUrl}${boardId}`)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because new card is missing');

					done();
				});
		});
	});

	describe('/GET/card', () => {

		it ('should get user board cards - success', done => {
			chai.request(server)
				.get(`${boardsUrl}${boardId}/cards`)
				.end((err, res) => {
					assert.equal(res.status, '200');

					done();
				});
		});

		it ('should get user board cards - fail', done => {
			chai.request(server)
				.get(`${boardsUrl}null`)
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

			chai.request(server)
				.put(`${boardsUrl}${boardId}`)
        .send(renamedBoardName)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});
	});

	describe('/DELETE/boardstars', () => {

		it ('should unstar a starred user board - success', done => {
			chai.request(server)
				.delete(`${boardsUrl}${boardId}/boardstars`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.boardStars.length);

					done();
				});
		});

		it ('should star a user board - fail', done => {
			chai.request(server)
				.post(`${boardsUrl}null/boardStars`)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because board id is not valid');

					done();
				});
		});
	});

	describe('/DELETE/board', () => {

		it ('should delete a user board - success', done => {
			chai.request(server)
				.delete(`${boardsUrl}${boardId}`)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200')
					assert.equal(0, res.body.data.boards.length);

					done();
				});
		});
	});
});