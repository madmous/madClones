'user strict';

import getLogger from '../libs/winston';
import mongoose from 'mongoose';
import Promise from 'bluebird';

import { 
  dbTestURI, 
  dbURI 
} from '../config/config';

const log = getLogger(module);

mongoose.Promise = Promise;

export let dbTest = {};
export let db = {};

db.connect = () => {
  const mongooseConnection = mongoose.connection;

  mongoose.connect(dbURI);

  mongooseConnection.on('connected', () => {  
    log.info('Mongoose default connection connected to ' + dbURI);
  });

  mongooseConnection.on('error', (err) => {  
    log.error('Mongoose default connection error: ' + err);
    process.exit(0); 
  }); 

  mongooseConnection.on('disconnected', () => {
    log.info('Mongoose default connection disconnected'); 
    process.exit(0); 
  });

  process.on('SIGINT', () => {  
    mongooseConnection.close( () => { 
      log.info('Mongoose default connection disconnected through app termination'); 
      process.exit(0); 
    }); 
  });
}

dbTest.connect = () => {
  const mongooseConnection = mongoose.connection;

  mongoose.connect(dbTestURI);

  mongooseConnection.on('connected', () => {  
    log.info('Mongoose default connection connected to ' + dbTestURI);
  });

  mongooseConnection.on('error', (err) => {  
    log.error('Mongoose default connection error: ' + err);
  });
}