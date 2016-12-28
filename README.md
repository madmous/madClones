## Description

[Trello](http://trello.com) clone being built with NodeJS, Express, MongoDB, React and Redux.

Web addict and javascript passionate. I am curious by anything new and learn frameworks by cloning amazing apps.
I am a fan of Software Craftmanship, TDD, BDD and CI practices; therefore this project's main goal is to follow 
all the coding standard and best practices.

## Main technologies

* React (react-create-app)
* Redux
* Bootstrap
* NodeJS
* Express
* MongoDB

## Support

* Star the repo
* Follow me on twitter [@datmadmmous](https://twitter.com/datmadmous)
* Submit pull requests and improve the repo overall quality
* Join [WeClone](https://weclone.slack.com/messages) slack channel and ask questions 

## Prerequisite

Before you install the project, make sure [Yarn](https://yarnpkg.com/en/docs/install) (prefered one) or Npm 
and [MongoDB](https://docs.mongodb.com/v3.2/administration/install-community/) are installed.

## Installation instructions

Once your package management is installed these commands will run your application.

1. Database

  `mongod` : handles data requests, manages data access and performs background management operations.
  
  `mongo` : starts the mongo shell and connect to your MongoDB instance running on localhost with default port.
  
1. Server
  
  `cd server`
  
  `yarn install`
  
  `yarn start`

2. Client

  `cd client`
  
  `yarn install` 
  
  `yarn start`

## Where to get help

[ES6](https://github.com/airbnb/javascript) : if you want to quickly be up to date with javascript best practices, 
AirBNB repo is a gold mine. Read it.

React : [AirBnB](https://github.com/airbnb/javascript/tree/master/react) and 
[RisingStack](https://blog.risingstack.com/react-js-best-practices-for-2016/)

NodeJS : again I will redirect you to [RisingStack](https://blog.risingstack.com/node-js-best-practices/).
They are awesome and they care about open source.

[Slacks](https://weclone.slack.com/messages/trello/) : my slack channel is the best and the fastest way to get help. Not only it will help us keep track of all
the questions, but also answers will benefit all members.

[CodinGame](https://www.codingame.com/home) : practicing your algorithm solving skills is a great way to write better code. CodinGame will push you 
to another level by making you think about the correct data structure, api and algorith, to use.

## Contribution guidelines

Slacks and Trello are my main communication and management tools and Github to handle pull requests
These are the steps to see your changes in develop.

1. No direct commit on master or develop
2. Ask to be added to channel trello board
3. Create a branch from develop with the same name as the trello card name
4. Code should be accompined with unit tests with 100% code coverage (whether it is on the client side or the server side)
5. Make a pull request (contributors should checkout the branch, run unit tests, then test the functionnality that was added, read the code and add comments).
6. End to end testing are not required for now.

## Updates

## Achievements

## Areas for Improvements / involvement

* Release version 1.0.0

* Add a white background color to each board section (star, user and users)
* Work on a better model for the store and the response from server
* Add create a new board feature
* Add create a new team feature
* Add star/unstar board feature
* Add a login section
* Make UI responsive
* Add enzyme

## Credits, Inspiration, Alternatives

## More informations

Check the [Client](https://github.com/Madmous/Trello-Clone/blob/develop/client/README.md) and the [Server](https://github.com/Madmous/Trello-Clone/blob/develop/server/README.md) readme
