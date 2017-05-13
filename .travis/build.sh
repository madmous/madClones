#!/bin/bash

docker logs -f madclones_trello-microservice_1

rc = docker wait madclones_trello-microservice_1

if [ rc -eq 0 ]
then
  echo $?
  echo "Success"
  exit 0
else
  echo $?
  echo "Failure"
  exit 1
fi