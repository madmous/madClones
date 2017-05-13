#!/bin/bash

docker logs -f madclones_trello-microservice_1

docker wait madclones_trello-microservice_1

exit 1