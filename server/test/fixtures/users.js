const async = require ('async');

const models = require ('../../src/models/index');
const config = require ('../../src/config/config');
const log	 = require ('../../src/libs/winston')(module);

const organizationModel = models.organizationModel;
const boardStarModel    = models.boardStarModel;
const boardModel        = models.boardModel;
const userModel         = models.userModel;

let users = [];

users[0] = new userModel({
	name: 'Moustapha',
	fullname: 'Moustapha A Diouf',
	password: 'test',
	initials: 'MAD',
	email: 'test@gmail.com'
});

users[0].save((err) => {
	if (err) {
		throw err;
	}
})