

  angular.module('dashboardApp').
    config(['$routeProvider',
      function ($routeProvider){
        $routeProvider.
/*          when('/charts', {
            template: '<result-charts></result-charts>'
          }).
          */
          when('/material', {
            template: '<material-list></material-list>'
          }).
          when('/customer', {
            template: '<customer-list></customer-list>'
          }).
          when('/dashboard', {
            template: '<dashboard-overview></dashboard-overview>'
          }).
          otherwise({
            redirectTo: "/dashboard"
          });
    }]);


    angular.module('dashboardApp').
    factory('ws', [ '$rootScope', function ($rootScope) {
    'use strict';
    var socket = io.connect(); //"http://localhost:8080"

    return {
      on: function (event, callback) {
        socket.on(event, function () {
          var args = arguments;
          $rootScope.$apply(function () {
            callback.apply(null, args);
          });
        });
      }
    };
  }]);


  angular.module('dashboardApp').service('SharedDataService', function () {
       var rcvdData = {
         customer: [],
         material: [],
         millingheat: ['millingheat'],//, 30, 200, 100, 400, 150, 250
         millingspeed: ['millingspeed'],//, 50, 20, 10, 40, 15, 25
         drillingheat: ['drillingheat'], //, 30, 200, 100, 400, 150, 250
         drillingspeed: ['drillingspeed'], //, 50, 20, 10, 40, 15, 25
         counter: 0,
         counter_rejects: 0

      };
      return rcvdData;
  });


  angular.module('dashboardApp').factory('State', function($http){
  //$http.get(/* init once per app */);

  return {
    formData:{},
  };
});




/*
    angular.module('dashboardApp').
    controller('myCtrl', function($scope) {
      $scope.x1 = "JOHN";
      $scope.x2 = angular.lowercase($scope.x1);
    });
*/
