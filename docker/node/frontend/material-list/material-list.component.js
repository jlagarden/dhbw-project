angular.
  module('materialList').
    component('materialList',{
      templateUrl: 'material-list/material-list.template.html',
      controller: function MaterialListController(ws, SharedDataService, $scope) {
        "use strict"
        //$scope.materialdata = scope.rcvdData.material;

        $scope.rcvdData = SharedDataService;

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
       });

        ws.on('kpis', function (data){
          $scope.rcvdData.counter = data.counter;
          $scope.rcvdData.counter_rejects = data.counter_rejects;
          $scope.rcvdData.amount_in_prod = data.amount_in_prod;
        });


        ws.on('dashboard_charts', function(data){

          if (data.donutchart){
            $scope.rcvdData.donutdata = [
                 ['reject', data.donutchart.reject],
                 ['success', data.donutchart.success]
               ]
          }

          if (data.materialchart){
             $scope.rcvdData.materialchartdata = data.materialchart;
          }
        });


        ws.on('chartview', function(data){
          if (data.good_bad_materials){
            $scope.rcvdData.good_bad_materials = data.good_bad_materials;
          }
          if(data.avg_prodtime_material){
            $scope.rcvdData.avg_prodtime_material = data.avg_prodtime_material;
          }
          if (data.drillingspeed){
            $scope.rcvdData.drillingspeed = data.drillingspeed;
          }

          if (data.millingspeed){
            $scope.rcvdData.millingspeed = data.millingspeed;
          }

          if (data.drillingtemp){
            $scope.rcvdData.drillingtemp = data.drillingtemp;
          }

          if (data.millingtemp){
            $scope.rcvdData.millingtemp = data.millingtemp;
          }
        });


      }
    });
