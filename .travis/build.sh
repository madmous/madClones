#!/bin/bash

before() {
  docker-compose -f dc-trello-service.test.yml up -d --build
  docker-compose -f dc-users-service.test.yml up -d --build
}

main() {
  docker logs -f madclones_trellomicroservice_1
  docker logs -f madclones_usersmicroservice_1

  [[ $(docker wait madclones_trellomicroservice_1) = 0 ]] && 
  [[ $(docker wait madclones_usersmicroservice_1) = 0 ]]
}

after() {
  docker-compose down madclones_trellomicroservice_1
  docker-compose down madclones_trellodb_1
  
  docker-compose down madclones_usersmicroservice_1
  docker-compose down madclones_usersdb_1

  docker rm $(docker ps -a -q)
}

case "$1" in
  before)
      before
      ;;
    
  main)
      main
      ;;
    
  after)
      after
      ;;
esac