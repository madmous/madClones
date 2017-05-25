#!/bin/bash

before() {
  docker-compose -f dc-trello-service.test.yml up -d
  docker-compose -f dc-users-service.test.yml up -d
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