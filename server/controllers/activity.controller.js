var rp = require('request-promise');
var PossibleActivities = require('../db').PossibleActivities;
var PossibleExpedia = require('../db').PossibleExpedia;
var yelpSearch = require('../helpers/activityHelper').yelpSearch;
var Trip = require('../db').Trip;

var activityController = {};

/* *
 * Get all previously found Yelp activities for a specific trip/uuid.
 * */
activityController.GET = function(req, res) {
  console.log('poopie' ,req.query, "poopie2")
  Trip.findOne({where: {uuid: req.query.uuid}})
    .then(function(trip) {
      console.log('sasasa', trip, 'asasas')
      console.log('sasasa', trip.dataValues.id, 'asasas')
  PossibleActivities
    .findAll({
      where: { trip_id: trip.dataValues.id}
    })
    .then(function(activity) {
      console.log(activity, 'actactact')
      res.status(200).json(activity);
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
  });
};

/* *
 * Make an API call to Yelp, finding all activities for a location,
 * and save them to the PossibleActivities table with the correct uuid.
 * */
activityController.POST = function(req, res) {
  console.log(req.uuid, 'abcdefg', req)
  yelpSearch(req.locationName, req.uuid)
    .then(function(searchResults) {
      //*****
      console.log('startLALA', searchResults, 'efghi')
      //searchResults are businessEntry from activity helper
      // searchResults.forEach(function(searchResult) {
      //   console.log(searchResult.trip_id, ' eqeqeq ', req.uuid, 'should be same')
      //   searchResult.trip_id = req.uuid;
      // });
      PossibleActivities.bulkCreate(searchResults);
    })
    .then(function(savedActivities) {
      res.status(200).json(savedActivities);
    })
    .catch(function(err) {
      res.status(418).send(err);
    });
};

/* *
 * Get all previously found Expedia activities for a specific trip/uuid.
 * */
activityController.GETEXPEDIA = function(req, res) {
  console.log("qwer", req.query, 'qwer')
  Trip.findOne({where: {uuid: req.query.uuid}})
    .then(function(trip) {
      console.log(trip, 'trippings')
  console.log('yyyyy', req.query, 'yyyyy')
  console.log('xxxxx', req, 'xxxxx')
  PossibleExpedia
    .findAll({
      where: { trip_id: trip.dataValues.id }
    })
    .then(function(expediaActivity) {
      console.log(expediaActivity, '12121212')
      res.status(200).send(expediaActivity);
    })
    .catch(function(err) {
      console.log('Error in retrieving activities: ', err);
      res.status(418).send(err);
    });
  });
};

/* *
 * Make an API call to Expedia, finding all activities for a location,
 * and save them to the PossibleActivities table with the correct uuid.
 * */
activityController.POSTEXPEDIA = function(req, res) {
  var url = 'http://terminal2.expedia.com/x/activities/search?location=' + req.locationName + '&apikey=' + process.env.expedia_api_key;
  var options = {
    method: 'POST',
    uri: url,
    json: true
  };
  rp(options)
    .then(function(body) {
      console.log(body, 'dddddd')
      console.log('rrrr', req, 'rrrrr')
      body.activities.slice(0, 20)
      var data = body.activities.map(function(expediaResult) {
        //// PUT USER_ID HERE WHEN READY!!!!!!!!
        return {
          trip_id: req.uuid,
          title: expediaResult.title,
          imageUrl: expediaResult.imageUrl,
          recommendationScore: expediaResult.recommendationScore,
          fromPrice: expediaResult.fromPrice
        }
      });
      console.log(data, 'shouldbetripid2')

      // Limit expedia results to 20.
      PossibleExpedia.bulkCreate(data);
    });
};

module.exports = activityController;
