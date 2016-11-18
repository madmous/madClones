'user strict';

const mongoose = require ('mongoose');
const dbURI 	 = require ('./config').database;
const log 	 	 = require ('../libs/winston')(module);

mongoose.connect(dbURI); 

mongoose.connection.on('connected', () => {  
  log.info('Mongoose default connection open to ' + dbURI);
}); 

mongoose.connection.on('error', (err) => {  
  log.error('Mongoose default connection error: ' + err);
}); 

mongoose.connection.on('disconnected', () => {  
  log.info('Mongoose default connection disconnected'); 
});

process.on('SIGINT', () => {  
  mongoose.connection.close( () => { 
    log.info('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
});