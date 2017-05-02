This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Do no hesitate to contribute and/or send me feedback on [twitter](https://twitter.com/datmadmous).

Version 1.0.0 covered the login, sign up and home page: you can create a team and add boards in it or directly add them in your personal boards. 
You can also star and unstar all your boards. 

Version 2.0.0 added the card view that allows to add cards, card items and move them between cards.

Version 3.0.0 added the boards menu. The user clicks on the boards button available in the header and can see all the boards (starred, personal and organiations) previously created..

## Live demo

[Login](http://d2et1tad5mldzf.cloudfront.net/) with Test (name) and Test(password). The redux logger was added to show the process.
Expect a lot of changes and database to be cleared often.

## Description

[Trello](http://trello.com) clone being built with MongoDB, Express, React, NodeJS; my mean stack revisited.

## Main Libraries

* Redux
* React Router
* React Router Redux
* Redux Form
* Redux Auth Wrapper
* React DnD
* Font Awesome

## Achievements

* Add redux and hook it up with the react application
* Add redux form to create organizations and boards
* Refactor structure and organize the application by routes/views

## Areas for Improvements / involvement

* Add a higher order components to add blur and focus events on PopOver, CreateOrganization/Board
* Make UI responsive
* Add drag and drop to cards (list that contains card items)
* Add a white background color to each board section (star, user and users)

--

* Added a login section
* Added a signup section to create a new user
* Added authentication checks to the home route
* Added unit test to reducers, actions, async actions, component lifecycles and event
