var Trip = require('../db').Trip;
var activityController = require('./activity.controller');
var authController = require('./auth.controller');

var searchController = {};

/* *
 * Ask Jongsoo and Oliver
 * */
searchController.POST = function(req, res) {
  return Trip.create({
    uuid: 'testuuid',
    password: 'testpw',
    locationName: req.body.locationName
  })
  .then(function(activity) {
    // yelp search
    activityController.POST({
      locationName: activity.dataValues.locationName,
      uuid: activity.dataValues.uuid
    });
    activityController.POSTEXPEDIA({
      locationName: activity.dataValues.locationName,
      uuid: activity.dataValues.uuid
    });
    authController.hash = activity.dataValues.uuid;
    res.status(201).send(activity);
  })
  .catch(function(err) {
    res.status(404).send(err);
  });
};

module.exports = searchController;
