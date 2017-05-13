#!/bin/bash

docker logs -f madclones_trello-microservice_1

docker wait madclones_trello-microservice_1

if [ "$?" -ne 0 ]
then 
  exit 1
fi