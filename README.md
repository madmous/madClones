# MadClones &middot; [![Build Status](https://travis-ci.org/Madmous/madClones.svg?branch=develop)](https://travis-ci.org/Madmous/madClones) [![Join the chat at https://gitter.im/dwyl/chat](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/madmous/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link) [![Twitter URL](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/datMadmous)

Welcome to my mono repo madClones. Started as a small monolith project to build a trello clone, it turned out to be the best project I ever started: it is basically my playground and I have lots of fun with it. 

You will not only see a wide variety of front end technolgies and a couple of microservices written in different languages and frameworks, but also an emphasis on software design and architecture.

I am a fan of Software Craftmanship, TDD, BDD and CI practices; therefore this project's main goal is to follow 
all the coding standard and best practices.

Do no hesitate to contribute and/or send me feedback on [twitter](https://twitter.com/datmadmous).

## Releases

Version 1.0.0 covered the login, sign up and home page: you can create a team and add boards in it or directly add them in your personal boards. 
You can also star and unstar all your boards. 

Version 2.0.0 added the card view that allows to add cards, card items and move them between cards.

Version 3.0.0 added the boards menu. The user clicks on the boards button available in the header and can see all the boards (starred, personal and organiations) previously created.

## Main technologies

* ReactJs
* Vue.js
* Express
* NodeJS
* Flask
* MongoDB
* MySQL
* Docker

## Technologies to be added

* Electron
* Kubernetes
* Rabbimq (not sure yet)

## Support

* Star the repo
* Follow me on twitter [@datmadmmous](https://twitter.com/datmadmous)
* Submit pull requests and improve the repo overall quality

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

The repository is divided into two folders. The [Client](https://github.com/Madmous/Trello-Clone/blob/develop/client/) which contains a react and a vue application and the [Server](https://github.com/Madmous/Trello-Clone/blob/develop/server/) which contains microservices.

I am very happy with the way both applications are structured and working daily to improve on it.
