#!/bin/bash

before() {
  docker-compose -f dc-trello.test.yml up -d
}

main() {
  docker logs -f madclones_trello-microservice_1
  [ $(docker wait madclones_trello-microservice_1) = 0 ]
}

after() {
  docker-compose down trellomicroservice_trello-microservice_1
  docker-compose down trellomicroservice_mongo_1 
}

success() {
  cat ./trello_coverage/lcov.info | ./node_modules/.bin/coveralls
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

  success)
      success
      ;;
esac