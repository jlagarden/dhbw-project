angular.
  module('dashboardOverview').
    component('dashboardOverview',{
      templateUrl: 'dashboard-overview/dashboard-overview.template.html',
      controller:



         function DashboardController(ws, SharedDataService, $scope, $timeout) {

           'use strict';
//get current and saved Data
           $scope.rcvdData = SharedDataService;
//get data for all views

          ws.on('material', function(data){
            $scope.rcvdData.material.push(data);
            $scope.rcvdData.counter += data.amount;
            $scope.rcvdData.counter_rejects += data.rejects;

          });

           ws.on('customer', function(data){
             $scope.rcvdData.customer.push(data);
           });



           ws.on('live_data', function (data){
             $scope.rcvdData.speed_milling =  Math.round(data.speed_milling * 100) / 100;
             $scope.rcvdData.speed_drilling = Math.round(data.speed_drilling * 100) / 100;
             $scope.rcvdData.temperature_drilling = Math.round(data.temperature_drilling * 100) / 100;
             $scope.rcvdData.temperature_milling = Math.round(data.temperature_milling * 100) / 100;
             $scope.rcvdData.current_action = data.current_action;

            if ($scope.rcvdData.millingheat.length > 11){
                    $scope.rcvdData.millingheat.splice(1, 1);
                    $scope.rcvdData.millingheat.push(data.temperature_milling);
            } else {
                $scope.rcvdData.millingheat.push(data.temperature_milling);
            }
            if ($scope.rcvdData.millingspeed.length > 11){
                    $scope.rcvdData.millingspeed.splice(1, 1);
                    $scope.rcvdData.millingspeed.push(data.speed_milling);
            } else {
                $scope.rcvdData.millingspeed.push(data.speed_milling);
            }

            if ($scope.rcvdData.drillingheat.length > 11){
                    $scope.rcvdData.drillingheat.splice(1, 1);
                    $scope.rcvdData.drillingheat.push(data.temperature_drilling);
            } else {
                $scope.rcvdData.drillingheat.push(data.temperature_drilling);
            }
            if ($scope.rcvdData.drillingspeed.length > 11){
                    $scope.rcvdData.drillingspeed.splice(1, 1);
                    $scope.rcvdData.drillingspeed.push(data.speed_drilling);
            } else {
                $scope.rcvdData.drillingspeed.push(data.speed_drilling);
            }

                $scope.rcvdData.chart = c3.generate({
                      bindto: '#chart3',
                      data: {
                          columns: [
                                       $scope.rcvdData.millingspeed,
                                       $scope.rcvdData.millingheat
                                   ],
                         axes: {millingheat: 'y2'}
                      },
                      axis: {
                          y: {
                            label: 'milling speed'
                          },
                          y2: {
                            show:true,
                            label: 'milling heat'
                          }
                      },
                  });


                  $scope.rcvdData.chart5 = c3.generate({
                          bindto: '#chart4',
                          data: {
                              columns: [
                                           $scope.rcvdData.drillingspeed,
                                           $scope.rcvdData.drillingheat
                                       ],
                             axes: {drillingheat: 'y2'}
                          },
                          axis: {
                              y: {
                                label: 'drilling speed'
                              },
                              y2: {
                                show:true,
                                label: 'drilling heat'
                              }
                          },
                  });

           });

           ws.on('kpis', function (data){
             $scope.rcvdData.counter = data.counter;
             $scope.rcvdData.counter_rejects = data.counter_rejects;
             $scope.rcvdData.amount_in_prod = data.amount_in_prod;
           });

/*
           ws.on('dashboard_charts', function(data){

             if (data.donutchart){
               $scope.rcvdData.donutdata = [
                    ['reject', data.donutchart.reject],
                    ['success', data.donutchart.success]
                  ]

               $scope.rcvdData.chart5.unload({
                  ids: 'success'
                });
                $scope.rcvdData.chart5.unload({
                   ids: 'reject'
                 });
               $scope.rcvdData.chart5.load({
                 columns: $scope.rcvdData.donutdata
               });
             }
*/

//           });





            $scope.showGraph = function() {

              setTimeout(function(){


                    /*$scope.rcvdData.donutdata = [
                      ['reject', 30],
                      ['success', 120],
                    ];*/
                    $scope.rcvdData.chart5 = c3.generate({
                            bindto: '#chart4',
                            data: {
                                columns: [
                                             $scope.rcvdData.drillingspeed,
                                             $scope.rcvdData.drillingheat
                                         ],
                               axes: {drillingheat: 'y2'}
                            },
                            axis: {
                                y: {
                                  label: 'drilling speed'
                                },
                                y2: {
                                  show:true,
                                  label: 'drilling heat'
                                }
                            },
                        });


                        $scope.rcvdData.chart = c3.generate({
                                 bindto: '#chart3',
                                 data: {
                                     columns: [
                                                  $scope.rcvdData.millingspeed,
                                                  $scope.rcvdData.millingheat
                                              ],
                                    axes: {millingheat: 'y2'}
                                 },
                                 axis: {
                                     y: {
                                       label: 'milling speed'
                                     },
                                     y2: {
                                       show:true,
                                       label: 'milling heat'
                                     }
                                 },
                        });

                    }, 3);




          }
        }

    });
