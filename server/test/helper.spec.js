'user strict';

const mongoose = require ('mongoose');

const dbTest  = require ('../src/config/dbTest');
const log	  = require ('../src/libs/winston')(module);
const app 	  = require ('../src/index');

const DatabaseCleaner = require('database-cleaner');
const databaseCleaner = new DatabaseCleaner('mongodb'); //type = 'mongodb|redis|couchdb'

before( (done) => {

	dbTest.connect( (err) => {
		if (!err) {
			log.info('Importing fixtures');
    		require('../test/fixtures/users');
			log.info('Importing fixtures -- DONE');
			done();
		}
	});
});

after( () => {
	databaseCleaner.clean(mongoose.connection.db, function() {
		log.info('DB cleaned');
		db.close();
		done();
	});
});