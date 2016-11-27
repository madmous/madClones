'user strict';

const mongoose = require ('mongoose');
const log 	 	 = require ('../libs/winston')(module);

const async = require ('async');

const dbURI = require ('../config/config').databaseTest;

let db = {};

let mongooseConnection;

db.connect = (done) => {

  mongoose.connect(dbURI, () => {
    mongooseConnection = mongoose.connection;
    done();
  });

  mongoose.connection.on('connected', () => {
    log.info('Mongoose default connection connected to ' + dbURI);
  }); 

  mongoose.connection.on('open', () => {
  }); 

  mongoose.connection.on('error', (err) => {  
    log.error('Mongoose default connection error: ' + err);
    done(err);
  });
}

db.clearDatabase = (done) => {
  /*mongooseConnection.db.listCollections().toArray(function(err, names) {
    log.info('### ' + names);
    if (err) {
      done(err);
    }
    else {
      names.forEach(function(e,i,a) {
        log.info('Dropping ' + e.name);
        mongooseConnection.db.dropCollection(e.name);
        log.info('Dropping ' + e.name + ' -- DONE');

        done();
      });
    }
  });*/
  mongooseConnection.db.dropDatabase(done);
}

  /*function dropCollection (done) {
    mongoose.connection.db.collections( (err, collections) => {
      async.each(collections, (collection, callback) => {
        if (collection.collectionName.indexOf('system') === 0) {
          return callback();
        }
        collection.remove({}, callback);
      }, done);
    })
  }*/

module.exports = db;