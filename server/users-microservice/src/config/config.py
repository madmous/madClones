import os

jwtSecret = '80AiE6Lul5tzO1Lm1Zwd1ayamScTspATlTNnB1eRsRSCldnyd8L02lYZJ2cKtZ4igjsPErQeUbXNRXOW5QpQ1mUMD23I4IWMBzYWBDmr9xc38kXFyNaBNm2W31kitaeI6PHdkcUN7KC89Put2jdri6ED-xZG5JAbqEg4GDEOwSRCnIcfWtO_nskls0qlPN5hWfQTzFZz-8veJowwKjrF_2xHV-0LDnAX5nX3qRbzmwFDIPvCDE0Zl60Ov8_IB2gN28tP-epouzdeZFd45uaB3MrDSmpuHRm-RU_vsU6tPLTLmCYqKxxB2HCZQ37OaaZMOyVQiN6jCDG293iRlsnJoA'

global trelloMicroserviceUrl

if 'FLASK_ENV' in os.environ.keys() and os.environ['FLASK_ENV'] == 'prod':
    trelloMicroserviceUrl = 'http://trellomicroservice:3001'
else:
    trelloMicroserviceUrl = 'http://127.0.0.1:3001'