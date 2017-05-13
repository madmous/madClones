#!/bin/bash

docker logs -f madclones_trello-microservice_1

var=$(docker wait madclones_trello-microservice_1)

if [ $var -eq 0 ]
then
  exit 0
else
  exit 1
fi