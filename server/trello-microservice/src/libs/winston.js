import winston from 'winston';

export default function getLogger (module) {
  let path = module.filename.split('/').slice(-2).join('/');

  return new winston.Logger({
    transports : [
      new winston.transports.Console({
        timestamp: () => {
          return new Date().toLocaleTimeString();
        },
        colorize : true,
        level    : 'debug',
        label    : path
      })
    ]
  });
}