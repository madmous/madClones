This repo is under active development. Do no hesitate to contribute and/or send me feedback on [twitter](https://twitter.com/datmadmous).

Version 1.0.0 covered the login, sign up and home page: you can create a team and add boards in it or directly add them in your personal boards. 
You can also star and unstar all your boards. 

Version 2.0.0 added the card view that allows to add cards, card items and move them between cards.

Version 3.0.0 added the boards menu. The user clicks on the boards button available in the header and can see all the boards (starred, personal and organiations) previously created..

## Live demo

[Login](http://d2et1tad5mldzf.cloudfront.net/) with Test (name) and Test(password). The redux logger was added to show the process.
Expect a lot of changes and database to be cleared often.

## Description

[Trello](http://trello.com) clone being built with MongoDB, Express, React, NodeJS; my mean stack revisited.

I am a fan of Software Craftmanship, TDD, BDD and CI practices; therefore this project's main goal is to follow 
all the coding standard and best practices.

## Main technologies

* MongoDB
* Express
* React
* NodeJS

## Support

* Star the repo
* Follow me on twitter [@datmadmmous](https://twitter.com/datmadmous)
* Submit pull requests and improve the repo overall quality

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

[ES6](https://github.com/airbnb/javascript): if you want to quickly be up to date with javascript best practices, 
AirBNB repo is a gold mine. Read it.

React: [AirBnB](https://github.com/airbnb/javascript/tree/master/react) and 
[RisingStack](https://blog.risingstack.com/react-js-best-practices-for-2016/)

NodeJS: again I will redirect you to [RisingStack](https://blog.risingstack.com/node-js-best-practices/).
They are awesome and they care about open source.

[CodinGame](https://www.codingame.com/home): practicing your algorithm solving skills is a great way to write better code. CodinGame will push you 
to another level by making you think about the correct data structure, api and algorith, to use.

## Inspiration

[React Trello Board](https://github.com/web-pal/react-trello-board): I used their implementation of React Drag and Drop because it is great

## Contribution guidelines

1. Start with the open issues
1. No direct commit on master or develop.
2. Create a branch from develop with issue number as a name. Exemple: TOC I#1 (TOC = Trello Clone and I = issue)
4. Code should be accompined with unit tests with 100% code coverage (whether it is on the client side or the server side).
5. Make a pull request.
6. End to end testing are not required for now.

## Next release (3.1.0)

* Complete the board view that displays cards

## Updates

* 1.0.0 first release of trello clone
* 2.0.0 add board view with cards and card items
* 3.0.0 add boardsmenu

## Achievements

* Release version 1.0.0
* Release version 2.0.0
* Release version 3.0.0
* Deploy react client on amazon web services S3
* Deploy express server on amazon web services ECS

## Areas for Improvements / involvement

* Add a white background color to each board section (star, user and users)
* Work on board header in home page : list boards and create features
* Make UI responsive

## Repository structure

The repository is divided into two folders. The [Client](https://github.com/Madmous/Trello-Clone/blob/develop/client/) which is the react application and the [Server](https://github.com/Madmous/Trello-Clone/blob/develop/server/) which is the express server.

I am very happy with the way both applications are structured and working daily to improve on it.
