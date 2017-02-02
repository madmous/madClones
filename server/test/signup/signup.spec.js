'use strict';

const mongoose = require('mongoose');
const chaiHttp = require('chai-http');
const chai     = require('chai');

const userModel = require('../../src/models/index').userModel;

const log = require('../../src/libs/winston')(module);
const app	= require('../../src/index');

chai.use(chaiHttp);

const signupUrl = '/api/v1/signup/';
const assert   = chai.assert;

describe('Signup' , () => {

	after(done => {
		userModel.find().remove().exec();

		done();
	});

	describe('/POST', () => {
    
    it ('should signup - sucess', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '200', 'status equals 200');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because username already exists');
					assert.equal(res.body.data.uiError.missingUsername, 
							'That name is already taken', 
							'status equals 400 because username already exists');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName2',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because email already exists');
					//TODO : add message when email is already taken

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because name is missing');
					assert.equal(res.body.data.uiError.missingUsername, 
							'Please enter your name');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because fullname is missing');
					assert.equal(res.body.data.uiError.missingFullname, 
							'Please enter your full name');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because password is missing');
					assert.equal(res.body.data.uiError.missingPassword, 
							'Please enter your password');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because initials missing');
					assert.equal(res.body.data.uiError.missingInitials, 
							'Please enter your initials');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				name: 'testName',
				fullname: 'testFullname',
				password: 'testPassword',
				initials: 'testInitials'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because email is missing');
					assert.equal(res.body.data.uiError.missingEmail, 
							'Please enter your email');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				password: 'testPassword',
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 'status equals 400 because username and full name are missing');
					assert.equal(res.body.data.uiError.missingUsername, 
							'Please enter your name');
					assert.equal(res.body.data.uiError.missingFullname, 
							'Please enter your full name');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				initials: 'testInitials',
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because username, full name and password are missing');
					assert.equal(res.body.data.uiError.missingUsername, 
							'Please enter your name');
					assert.equal(res.body.data.uiError.missingFullname, 
							'Please enter your full name');
						assert.equal(res.body.data.uiError.missingPassword, 
							'Please enter your password');

					done();
				});
		});

		it ('should signup - fail', done => {
			const user = {
				email: 'testEmail@email.com'
			};

			chai.request(app)
				.post(signupUrl)
				.send(user)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because username, full name, password and initials are missing');
					assert.equal(res.body.data.uiError.missingUsername, 
							'Please enter your name');
					assert.equal(res.body.data.uiError.missingFullname, 
							'Please enter your full name');
					assert.equal(res.body.data.uiError.missingPassword, 
							'Please enter your password');
					assert.equal(res.body.data.uiError.missingInitials, 
							'Please enter your initials');

					done();
				});
		});

		it ('should signup - fail', done => {
			chai.request(app)
				.post(signupUrl)
				.end((err, res) => {
					assert.equal(res.status, '400', 
							'status equals 400 because all arguments are missing');
					assert.equal(res.body.data.uiError.missingUsername, 
							'Please enter your name');
					assert.equal(res.body.data.uiError.missingFullname, 
							'Please enter your full name');
					assert.equal(res.body.data.uiError.missingPassword, 
							'Please enter your password');
					assert.equal(res.body.data.uiError.missingInitials, 
							'Please enter your initials');
					assert.equal(res.body.data.uiError.missingEmail, 
							'Please enter your email');

					done();
				});
		});
	});
});