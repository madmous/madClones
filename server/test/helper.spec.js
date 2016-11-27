'user strict';

const mongoose = require ('mongoose');

const dbTest  = require ('../src/config/dbTest');
const log			= require ('../src/libs/winston')(module);
const app 		= require ('../src/index');

before( () => {
	dbTest.connect( (err) => {
		if (!err) {
			log.info('Importing fixtures');
    	require('../test/fixtures/users');
			log.info('Importing fixtures -- DONE');
		}
	});
});

after( () => {
	log.info('Clearing DB');

	dbTest.clearDatabase( (err) => {
		if (!err) {
			log.info('Clearing DB -- DONE');
		}
	})
});