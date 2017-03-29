angular.
  module('resultCharts').
    component('resultCharts',{
      templateUrl: 'result-charts/result-charts.template.html',
      controller:
         function C3ChartController(ws, SharedDataService, $scope) {

           $scope.rcvdData = SharedDataService;

           ws.on('customer', function(data){
             $scope.rcvdData.customer.push(data);
           });


           ws.on('material', function(data){
             $scope.rcvdData.material.push(data);
             $scope.rcvdData.counter += data.amount;
             $scope.rcvdData.counter_rejects += data.rejects;
           });


           ws.on('live_data', function (data){
             $scope.rcvdData.speed_milling = data.speed_milling;
             $scope.rcvdData.speed_drilling = data.speed_drilling;
             $scope.rcvdData.temperature_drilling = data.temperature_drilling;
             $scope.rcvdData.temperature_milling = data.temperature_milling;
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

               $scope.chart3 = c3.generate({
                       bindto: '#chart4',
                       data: {
                         columns: $scope.rcvdData.good_bad_materials[1],
                         type:"bar",
                         colors: {
                           bad: '#FF4000', //'#2ca02c',
                           good: '#98df8a'
                         }
                       },
                       axis: {
                           x: {//1->tackles, 2->keypasses, 3->shots, 4->ballwins, 5->fouls
                                   type: "category",
                                   categories: $scope.rcvdData.good_bad_materials[0]
                               },
                           y: {
                             label: 'count'
                           }
                       },
                       grid: {
                         x: {
                           show: true
                         },
                         y: {
                           show: true
                         }
                       }
                   });
             }


             if(data.avg_prodtime_material){
               $scope.rcvdData.avg_prodtime_material = data.avg_prodtime_material;
               $scope.chart4 = c3.generate({
                       bindto: '#chart',
                       data: {
                         columns: $scope.rcvdData.avg_prodtime_material[1],
                         type: "bar"
                       },
                       axis: {
                           x: {
                                   type: "category",
                                   categories: $scope.rcvdData.avg_prodtime_material[0]
                               },
                           y: {
                             label: 'time'
                             }
                       },
                       grid: {
                         x: {
                           show: true
                         },
                         y: {
                           show: true
                         }
                       }
                   });
             }

             if (data.drillingspeed){
               $scope.rcvdData.drillingspeed = data.drillingspeed;
               $scope.rcvdData.chart7 = c3.generate({
                       bindto: '#chart7',
                       data: {
                           x: 'x',
                           xFormat: '%Y-%m-%d %H:%M:%S',
                           columns: $scope.rcvdData.drillingspeed
                       },
                       color: {
                           pattern: ['#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                       },
                       axis: {
                           x: {
                               type: 'timeseries',
                               tick: {
                                   format: '%Y-%m-%d %H:%M:%S',
                                   rotate: 35
                               }
                           },
                           y: {
                               label: 'drilling speed m/s'
                           }
                       },
                       grid: {
                         y: {
                             lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                         }
                     }
                   });
             }

             if (data.millingspeed){
               $scope.rcvdData.millingspeed = data.millingspeed;
               $scope.rcvdData.chart9 = c3.generate({
                       bindto: '#chart5',
                       data: {
                           x: 'x',
                           xFormat: '%Y-%m-%d %H:%M:%S',
                           columns: $scope.rcvdData.millingspeed
                       },
                       color: {
                           pattern: ['#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                       },
                       axis: {
                           x: {
                               type: 'timeseries',
                               tick: {
                                   format: '%Y-%m-%d %H:%M:%S',
                                   rotate: 35
                               }
                           },
                           y: {
                               label: 'milling speed m/s'
                           }
                       },
                       grid: {
                         y: {
                             lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                         }
                     }
                   });
             }

             if (data.drillingtemp){
               $scope.rcvdData.drillingtemp = data.drillingtemp;
               $scope.rcvdData.chart = c3.generate({
                       bindto: '#chart3',
                       data: {
                           x: 'x',
                           xFormat: '%Y-%m-%d %H:%M:%S',
                           columns: $scope.rcvdData.drillingtemp
                       },
                       color: {
                           pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                       },
                       axis: {
                           x: {
                               type: 'timeseries',
                               tick: {
                                   format: '%Y-%m-%d %H:%M:%S' /*%Y-%m-%d*/,
                                   rotate: 35
                               }
                           },
                           y: {
                               label: 'drilling temperature °C'
                           }
                       },
                       grid: {
                         y: {
                             lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                         }
                     }
                   });
             }

             if (data.millingtemp){
               $scope.rcvdData.millingtemp = data.millingtemp;
               $scope.rcvdData.chart8 = c3.generate({
                       bindto: '#chart8',
                       data: {
                           x: 'x',
                           xFormat: '%Y-%m-%d %H:%M:%S',
                           columns: $scope.rcvdData.millingtemp
                       },
                       color: {
                           pattern: [  '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                       },
                       axis: {
                           x: {
                               type: 'timeseries',
                               tick: {
                                   format: '%Y-%m-%d %H:%M:%S',
                                   rotate: 35
                               }
                           },
                           y: {
                               label: 'milling temperature °C'
                           }
                       },
                       grid: {
                         y: {
                             lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                         }
                     }
                   });
             }

           });








            $scope.showGraph = function() {

              setTimeout(function(){
                $scope.rcvdData.chart3 = c3.generate({
                        bindto: '#chart4',
                        data: {
                          columns: $scope.rcvdData.good_bad_materials[1],
                          type:"bar",
                          colors: {
                            bad: '#FF4000', //'#2ca02c',
                            good: '#98df8a'
                          }
                        },
                        axis: {
                            x: {//1->tackles, 2->keypasses, 3->shots, 4->ballwins, 5->fouls
                                    type: "category",
                                    categories: $scope.rcvdData.good_bad_materials[0],
                                    label: 'materialnumber'
                                },
                            y: {
                              label: 'count'
                            }
                        },
                        grid: {
                          x: {
                            show: true
                          },
                          y: {
                            show: true
                          }
                        }
                    });



                $scope.rcvdData.chart = c3.generate({
                        bindto: '#chart3',
                        data: {
                            x: 'x',
                            xFormat: '%Y-%m-%d %H:%M:%S',
                            columns: $scope.rcvdData.drillingtemp
                        },
                        color: {
                            pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                        },
                        axis: {
                            x: {
                                type: 'timeseries',
                                tick: {
                                    format: '%Y-%m-%d %H:%M:%S' /*%Y-%m-%d*/,
                                    rotate: 35
                                }
                            },
                            y: {
                                label: 'drilling temperature °C'
                            }
                        },
                        grid: {
                          y: {
                              lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                          }
                      }
                    });

                    $scope.rcvdData.chart8 = c3.generate({
                            bindto: '#chart8',
                            data: {
                                x: 'x',
                                xFormat: '%Y-%m-%d %H:%M:%S',
                                columns: $scope.rcvdData.millingtemp
                            },
                            color: {
                                pattern: [  '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                            },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        format: '%Y-%m-%d %H:%M:%S',
                                        rotate: 35
                                    }
                                },
                                y: {
                                    label: 'milling temperature °C'
                                }
                            },
                            grid: {
                              y: {
                                  lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                              }
                          }
                        });


                        $scope.rcvdData.chart7 = c3.generate({
                                bindto: '#chart7',
                                data: {
                                    x: 'x',
                                    xFormat: '%Y-%m-%d %H:%M:%S',
                                    columns: $scope.rcvdData.drillingspeed
                                },
                                color: {
                                    pattern: ['#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                                },
                                axis: {
                                    x: {
                                        type: 'timeseries',
                                        tick: {
                                            format: '%Y-%m-%d %H:%M:%S',
                                            rotate: 35
                                        }
                                    },
                                    y: {
                                        label: 'drilling speed m/s'
                                    }
                                },
                                grid: {
                                  y: {
                                      lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                                  }
                              }
                            });


                            $scope.rcvdData.chart9 = c3.generate({
                                    bindto: '#chart5',
                                    data: {
                                        x: 'x',
                                        xFormat: '%Y-%m-%d %H:%M:%S',
                                        columns: $scope.rcvdData.millingspeed
                                    },
                                    color: {
                                        pattern: ['#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
                                    },
                                    axis: {
                                        x: {
                                            type: 'timeseries',
                                            tick: {
                                                format: '%Y-%m-%d %H:%M:%S',
                                                rotate: 35
                                            }
                                        },
                                        y: {
                                            label: 'milling speed m/s'
                                        }
                                    },
                                    grid: {
                                      y: {
                                          lines: [{value: 120, class: 'gridhot', text: 'hot'}]
                                      }
                                  }
                                });


                $scope.chart2 = c3.generate({
                        bindto: '#chart2',
                        data: {
                          columns: [
                            ['data', 81.4]
                          ],
                          type: 'gauge'
                        }
                    });

            $scope.chart4 = c3.generate({
                    bindto: '#chart',
                    data: {
                      columns: $scope.rcvdData.avg_prodtime_material[1],
                      type: "bar"
                    },
                    axis: {
                        x: {
                                type: "category",
                                categories: $scope.rcvdData.avg_prodtime_material[0]
                            },
                        y: {
                          label: 'time'
                          }
                    },
                    grid: {
                      x: {
                        show: true
                      },
                      y: {
                        show: true
                      }
                    }
                });


}, 3);


          }
        }

    });
