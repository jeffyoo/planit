(function() {
 'use strict';

 angular
    .module('app.activityList')
    .controller('ActivityController', ActivityController);

  ActivityController.$inject = ['$scope', '$state', 'activityService'];

  function ActivityController($scope, $state, activityService) {
    var vm = this;
    vm.possibleActivities = [];
    vm.getActivities = getActivities;
    vm.getSelectedActivity = getSelectedActivity;
    vm.uuid;

    /* *
    * ActivityController listens for a change in ParentController's uuid value
    * and gets the possible activities from /api/activity for the trip with that uuid.
    *
    * It also sets selectedActivity of the ParentController on user-click in getSelectedActivity().
    * */

    $scope.$on('uuidChange', function(event, args) {
      vm.uuid = args.val;
      vm.getActivities(args.val);
    });

    function getActivities(uuid) {
      return activityService.getActivities(uuid)
        .then(function(data) {
          // format the address of each location for display
          data.forEach(function(entry) {
            var splitz = entry.address.split('');
            for (var i = 0; i < splitz.length; i++) {
              var temp = '';
              if (splitz[i] === '"' || splitz[i] === '{' || splitz[i] === '}') {
                splitz[i] = temp;
              } else if (splitz[i] === ',') {
                splitz[i] += ' ';
              }
            }
            splitz = splitz.join('');
            entry.address = splitz;
          });
          vm.possibleActivities = data;
        })
        .catch(function(err) {
          console.log('There was an error in getActivities: ', err);
        });
    }

    function getSelectedActivity(activity) {
      $scope.$parent.selectedActivity = activity;
      vm.getActivities(vm.uuid);
    }

    /* *
    * There is a setTimeout here because we need to retrieve the uuid value
    * before getting a trip's possible activities.
    * */

    setTimeout(function() {
      vm.getActivities(vm.uuid);
    }, 1500);
  }
})();
