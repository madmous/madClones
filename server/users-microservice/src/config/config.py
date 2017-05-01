import os

jwtSecret = '_202ph=oob#c*a&_bvrb24za#v=%$70(+ycu_gz+od96m!_dmx'

global trelloMicroserviceUrl

if 'FLASK_ENV' in os.environ.keys() and os.environ['FLASK_ENV'] == 'prod':
    trelloMicroserviceUrl = 'http://trellomicroservice:3001'
else:
    trelloMicroserviceUrl = 'http://127.0.0.1:3001'