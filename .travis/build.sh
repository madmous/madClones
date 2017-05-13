#!/bin/bash

docker logs -f madclones_trello-microservice_1

docker wait madclones_trello-microservice_1

if [ "$?" -eq 1 ]
then 
  echo "Error"
  exit 1
else 
  echo "No error"
  exit 0
fi