export const jwtSecret = '80AiE6Lul5tzO1Lm1Zwd1ayamScTspATlTNnB1eRsRSCldnyd8L02lYZJ2cKtZ4igjsPErQeUbXNRXOW5QpQ1mUMD23I4IWMBzYWBDmr9xc38kXFyNaBNm2W31kitaeI6PHdkcUN7KC89Put2jdri6ED-xZG5JAbqEg4GDEOwSRCnIcfWtO_nskls0qlPN5hWfQTzFZz-8veJowwKjrF_2xHV-0LDnAX5nX3qRbzmwFDIPvCDE0Zl60Ov8_IB2gN28tP-epouzdeZFd45uaB3MrDSmpuHRm-RU_vsU6tPLTLmCYqKxxB2HCZQ37OaaZMOyVQiN6jCDG293iRlsnJoA';

export const dbURI = (() => {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    return 'mongodb://localhost/usersService';
  } else {
    return 'mongodb://usersdb:27017/usersService';
  }
})();

export const dbTestURI = (() => {
  if (process.env.NODE_ENV === 'docker-test') {
    return 'mongodb://usersdb:27017/usersServiceTest';
  } else if (process.env.NODE_ENV === 'test'){
    return 'mongodb://localhost/usersServiceTest';
  }
})();

export const trelloMicroserviceUrl = (() => {
  if (process.env.NODE_ENV === 'dev' || process.env.NODE_ENV === 'test') {
    return 'http://127.0.0.1:3001/';
  } else {
    return 'http://trellomicroservice:3001/';
  }
})();

export const port = 3002;