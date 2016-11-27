'user strict';

const mongoose = require ('mongoose');
const log 	 	 = require ('../libs/winston')(module);

const dbURI = require ('../config/config').database;

let db = {};

db.connect = () => {
  const mongooseConnection = mongoose.connection;

  mongoose.connect(dbURI);

  mongooseConnection.on('connected', () => {  
    log.info('Mongoose default connection connected to ' + dbURI);
  });

  mongooseConnection.on('error', (err) => {  
    log.error('Mongoose default connection error: ' + err);
  }); 

  mongooseConnection.on('disconnected', () => {
    log.info('Mongoose default connection disconnected'); 
  });

  process.on('SIGINT', () => {  
    mongooseConnection.close( () => { 
      log.info('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });
}

module.exports = db;