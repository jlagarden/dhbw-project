dashboard kpis

{
  speed_milling : 33.4,
  speed_drilling : 123.4,
  counter : 23,
  counter_rejects : 3,
  temperature_drilling : 66.8,
  temperature_milling : 45.7,
  amount_in_prod : 1,
  current_action : "milling"
}



var message2 = {
  reject : 15,
  success : 66,
  material:  [
               ['x', '1476258417416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
          //     ['x', '2013-01-01 17:25:00.123', '2013-01-02 17:30:00.345', '2013-01-03 17:31:00.345', '2013-01-04 17:32:30.345', '2013-01-05 17:32:41.345', '2013-01-06 17:32:51.345'],
               ['material1', 30, 200, 240, 400, 150, 250],
               ['material2', 130, 340, 200, 500, 250, 350]
             ]
}


Aufbau des JSON, welches vom Nodejs kafka consumer empfangen und vearbeitet wird:
{
  "live_data":{
            speed_milling : 33.4,
            speed_drilling : 123.4,
            temperature_drilling : 66.8,
            temperature_milling : 45.7,
            current_action : "milling"
  },
  "kpis": {
            counter : 23,
            counter_rejects : 3,
            amount_in_prod : 1
  },
  "dashboard_charts": {
            "donutchart" : {
              reject : 15,
              success : 66
            },
            "materialchart":
              [
                 ['x', '1476258417416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
                 ['material1nr', 30, 200, 240, 400, 150, 250],
                 ['material2nr(8235)', 130, 340, 200, 500, 250, 350]
              ]
  },
  "material": [
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    },
    {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    }
  ],
  "customer":  [
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
      {
          number: 4717,
          amountorders: 2,
          materialnumber: 1757,
          avgrejects: 0.3,
          amountorderedmaterial: 21
      },
    ],
    "chartview":{
      "good_bad_materials": [
                              ['material1', 'material2', 'material3', 'material4', 'material5', 'material6'],
                              [
                               ['good', 30, 20, 70, 40, 15, 50],
                               ['bad', 50, 20, 10, 40, 15, 25]
                              ]
                            ],
      "drillingtemp": [
                           ['x', '1476258417416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
                           ['material1', 95, 105, 100, 130, 110, 120],
                           ['material2', 110.3, 134.2, 124.3, 117, 116, 120.4]
                       ],
      "millingtemp": [
                          ['x',  '1476258817416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
                          ['material1', 95, 105, 100, 130, 110, 120],
                          ['material2', 110.3, 134.2, 124.3, 117, 116, 120.4]
                      ],
      "drillingspeed": [
                          ['x',  '1476258817416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
                          ['material1', 295, 305, 300, 330, 310, 290],
                          ['material2', 300.3, 310.2, 324.3, 317, 316, 290.4]
                      ],
      "millingspeed":[
                        ['x',  '1476258817416', '1476258436796', '1476258446806', '1476258486826', '1476258536906', '1476258546936'],
                        ['material1', 295, 305, 300, 330, 310, 290],
                        ['material2', 300.3, 310.2, 324.3, 317, 316, 290.4]
                    ]
      "avg_prodtime_material": [
                              ['material1', 'material2', 'material3', 'material4', 'material5', 'material6'],
                              [
                               ['average production time', 30, 28, 35, 40, 25, 37]
                              ]
                            ],
    }
}
