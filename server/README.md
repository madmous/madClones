Server completely being rewritten with microservices in mind.

So far there is a tello service and a users service(that will be used for authentication).

## Build with docker

Make sure you have docker installed on your machine and are inside madClones folder.

1. cd trello-microservice
2. docker build -t madmous/trellomicroservice .
3. cd ../users-microservice
4. docker built -t madmous/usersmicroservice
5. cd ..
6. mysql.server stop (command tested on mac. Since I am mapping the port 3306 of the mysql docker image, you need to make sure your local mysql is not running already on that same port).
7. docker-compose up

Your server is up and running.

## Build without docker for development

Most of the times I deploy my server without using docker. I do not usually need to deploy the entire backend since working with 1 microservice is usually more than enough.

### Build Trello service

1. mongod
2. mongo
1. cd trello-microservice
2. yarn start:dev

### Build Users service

1. mysql.server start (tested on mac)
2. python src/index.py

Enjoy !!
