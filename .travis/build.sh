#!/bin/bash

docker logs -f madclones_trello-microservice_1

docker wait madclones_trello-microservice_1

if [[ "$?" == '0' ]]
  exit 0
else 
  exit 1
fi