Server completely being rewritten with microservices in mind.

So far there is a tello service and a users service(that will be used for authentication)

# Ideas

The plan is to move this repo to a mono WeClone repo that will have a huge a microservice architecture with a bunch of applications in it: Trello Clone, HipChat Clone

## Plan

### Architecture

Trello service linked to a mongo database
Users service linked to a mysql database

So far this is what I have in mind. I will refactor and rethink the architecture as the server grows. Seperating domains and similar functional logic in micro services

### Frameworks and tools

Docker
Docker compose
Express
Flask
Rabbimq
Spring Boot
Spring Cloud (still thinking about it) with zuul as an api gateway
