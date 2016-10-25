# planit

Planit is a travel helper application where a group of friends can plan a trip together. It is a collaborative social planning app that is designed to facilitate a group trip.

### TODOS
- Refactor SQL database to use relationships.
- Refactor API calls, wrapping them in a promise.
- A trip/room should be password-protected.
- A user should be able to authenticate his/her identity, or sign-up, sign-in, log-out.
- Multiple users should be able to chat inside a trip (sockets).
- A user should be able to comment on each saved activity in the itinerary.
- A user should be able to delete a saved activity from the itinerary.
- A user should be able to click an 'Attend' button on an activity in the itinerary that indicates to other users that he/she will attend.
- A user should be able to save multiple trips.
- A user should be able to see travel information for a location ([TuGo API](http://developer.tugo.com/)).

## Getting Started

### Prerequisites

1. Run `npm install`.  
2. Run `npm start`.  
3. Go to localhost:8000.  

or visit https://planit-demo.herokuapp.com/

### Built With

* [Angular](https://angularjs.org/)
* [POSTGRESQL](https://postgresql.org/)
* [Bootstrap](http://getbootstrap.com/)
* [Node](https://nodejs.org/en/)
* [Express](http://expressjs.com/)

### Client App Information
#### Directory Tree
```
|-- Planit
    |-- .env
    |-- .gitignore
    |-- directoryList.md
    |-- favicon.ico
    |-- package.json
    |-- README.md
    |-- sample.env
    |-- client
    |   |-- index.html
    |   |-- trip.html
    |   |-- app
    |   |   |-- app.config.js
    |   |   |-- app.controller.js
    |   |   |-- app.module.js
    |   |   |-- common
    |   |   |   |-- auth
    |   |   |   |   |-- auth.controller.js
    |   |   |   |   |-- auth.html
    |   |   |   |   |-- auth.module.js
    |   |   |   |   |-- auth.service.js
    |   |   |   |-- search
    |   |   |       |-- search.controller.js
    |   |   |       |-- search.html
    |   |   |       |-- search.module.js
    |   |   |       |-- search.route.js
    |   |   |       |-- search.service.js
    |   |   |-- components
    |   |       |-- activities
    |   |       |   |-- activities.controller.js
    |   |       |   |-- activities.html
    |   |       |   |-- activities.module.js
    |   |       |   |-- activities.service.js
    |   |       |-- itinerary
    |   |           |-- itinerary.controller.js
    |   |           |-- itinerary.html
    |   |           |-- itinerary.module.js
    |   |           |-- itinerary.service.js
    |   |-- assets
    |       |-- bridge.jpeg
    |       |-- planit-logo.png
    |       |-- styles.css
    |-- server
        |-- server.js
        |-- controllers
        |   |-- activity.controller.js
        |   |-- auth.controller.js
        |   |-- index.js
        |   |-- itinerary.controller.js
        |   |-- search.controller.js
        |-- db
        |   |-- db.js
        |   |-- index.js
        |-- helpers
        |   |-- activityHelper.js
        |-- middlewares
        |   |-- placeholder.js
        |-- models
        |   |-- index.js
        |   |-- possibleActivities.js
        |   |-- possibleExpedia.js
        |   |-- savedActivities.js
        |   |-- savedExpedia.js
        |   |-- trip.js
        |-- routes
            |-- activity.router.js
            |-- auth.router.js
            |-- index.js
            |-- itinerary.router.js
            |-- search.router.js
```
#### REST/CRUD Outline:
          
|   Endpoint             |   Method   |  Response                                          |
|------------------------|:----------:|----------------------------------------------------|
| /api/activity          |  GET       | Get Yelp results for a location.                   |
| /api/activity          |  POST      | Save Yelp results for a trip.                      |
| /api/activity/expedia  |  GET       | Get Expedia results for a location.                |
| /api/activity/expedia  |  POST      | Save Expedia results for a trip.                   |
| /api/auth              |  GET       | Get UUID for a trip.                               |
| /api/auth/#/trip/:uuid |  GET       | Get all saved data for a trip.                     |
| /api/itinerary         |  GET       | Get Yelp activities saved to a trip's itinerary.   |
| /api/itinerary         |  POST      | Save a Yelp activity to a trip's itinerary.        |
| /api/itinerary/expedia |  GET       | Get Expedia activities saved to a trip's itinerary.|
| /api/itinerary/expedia |  POST      | Save an Expedia activity to a trip's itinerary.    |
| /api/search            |  POST      | Post location to database and autocomplete query.  |

## Authors

- Oliver Wang
- Dianne Le
- Justin Biele
- Jongsoo Yoon

## License

ISC

## Acknowledgments

- Makersquare LA aka Hack Reactor LA
