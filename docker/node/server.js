'use strict';
  var path = require('path');
  var moment = require('moment');
  var kafka = require('kafka-node');
  var http = require('http');
  var express = require('express'),
      app = module.exports.app = express();

  var server = http.createServer(app);
  var io = require('socket.io').listen(server);  //pass a http.Server instance


  var Consumer = kafka.Consumer;
  var Client = kafka.Client;

  var salt = 0;



app.use(express.static('frontend'));

app.get('/', function (req, res) {
  res.sendfile(path.resolve('./frontend/index.html'));
});




//variables for kafka-consumer
var options = {
      groupId: 'kafka-node-group',//consumer group id, default `kafka-node-group`
      // Auto commit config
      autoCommit: true,
      autoCommitIntervalMs: 5000,
      // The max wait time is the maximum amount of time in milliseconds to block waiting if insufficient data is available at the time the request is issued, default 100ms
      fetchMaxWaitMs: 100,
      // This is the minimum number of bytes of messages that must be available to give a response, default 1 byte
      fetchMinBytes: 1,
      // The maximum bytes to include in the message set for this partition. This helps bound the size of the response.
      fetchMaxBytes: 1024 * 1024,
      // If set true, consumer will fetch message from the given offset in the payloads
      fromOffset: false,
      // If set to 'buffer', values will be returned as raw buffer objects.
      encoding: 'utf8'
};

var topics = [{
        topic: 'live',
        offset: 0, //default 0
      }, {
        topic: 'customer'
      },{
        topic: 'material'
      },{
        topic: 'charts'
      }];

var topicLive = [{ topic: 'live' }];
var topicCustomer = [{ topic: 'customer' }];
var topicMaterial = [{ topic: 'material' }];
var topicCharts = [{ topic: 'charts' }];



setTimeout(function(){
console.log("Node-Kafka-Consumer: Running on kafka:2181")
var client = new Client("kafka:2181"); //:2181
var consumer = new Consumer(client, topics, options);

/*
var consumerLive = new Consumer(client, topicLive, options);
var consumerMaterial = new Consumer(client, topicMaterial, options);
var consumerCustomer = new Consumer(client, topicCustomer, options);
var consumerCharts = new Consumer(client, topicCharts, options);
*/



io.sockets.on('connection', function (socket) {


//json simuliert, dass aus kafka kommt

/*
var message = {
/*  "live_data":{
            speed_milling : 33.4,
            speed_drilling : 123.4,
            temperature_drilling : 66.8,
            temperature_milling : 45.7,
            current_action : "milling"
  },*/

//}
/*
if (message.dashboard_charts.materialchart){
  for (var i=1; i< message.dashboard_charts.materialchart[0].length; i++){
    message.dashboard_charts.materialchart[0][i] = moment(parseInt(message.dashboard_charts.materialchart[0][i])).format('YYYY-MM-DD HH:mm:ss');;
  }
}

if (message.chartview.drillingtemp){
  for (var i=1; i< message.chartview.drillingtemp[0].length; i++){
    message.chartview.drillingtemp[0][i] = moment(parseInt(message.chartview.drillingtemp[0][i])).format('YYYY-MM-DD HH:mm:ss');;
  }
}

if (message.chartview.millingspeed){
  for (var i=1; i< message.chartview.millingspeed[0].length; i++){
    message.chartview.millingspeed[0][i] = moment(parseInt(message.chartview.millingspeed[0][i])).format('YYYY-MM-DD HH:mm:ss');;
  }
}

if (message.chartview.drillingspeed){
  for (var i=1; i< message.chartview.drillingspeed[0].length; i++){
    message.chartview.drillingspeed[0][i] = moment(parseInt(message.chartview.drillingspeed[0][i])).format('YYYY-MM-DD HH:mm:ss');;
  }
}

if (message.chartview.millingtemp){
  for (var i=1; i< message.chartview.millingtemp[0].length; i++){
    message.chartview.millingtemp[0][i] = moment(parseInt(message.chartview.millingtemp[0][i])).format('YYYY-MM-DD HH:mm:ss');;
  }
}
*/
/*
if (message.kpis){
  socket.emit('kpis', message.kpis);
}

if (message.dashboard_charts){
  socket.emit('dashboard_charts', message.dashboard_charts);
}
*/
/*
if (message.material){
  socket.emit('material', message.material);
}
*/

/*
if (message.customer){
  socket.emit('customer', message.customer);
}*/
/*
if (message.chartview){
  socket.emit('chartview', message.chartview);
}
*/
/*
setTimeout(function(){

    socket.emit("customer", {
           number: 4717,
           amountorders: 2,
           materialnumber: 1757,
           avgrejects: 0.3,
           amountorderedmaterial: 21
    });

    socket.emit("customer", {
           number: 4717,
           amountorders: 2,
           materialnumber: 1757,
           avgrejects: 0.3,
           amountorderedmaterial: 21
    });

},10000);
*/
/*
socket.emit("customer", {
       number: 4717,
       amountorders: 2,
       materialnumber: 1757,
       avgrejects: 0.3,
       amountorderedmaterial: 21
});

setTimeout(function(){
socket.emit("customer", {
       number: 4717,
       amountorders: 2,
       materialnumber: 1757,
       avgrejects: 0.3,
       amountorderedmaterial: 21
});
},100);
setTimeout(function(){
socket.emit("customer", {
       number: 4717,
       amountorders: 2,
       materialnumber: 1757,
       avgrejects: 0.3,
       amountorderedmaterial: 21
});
},200);
*/


/*
setTimeout(function(){


socket.emit('live_data', {
            speed_milling : 33.4,
            speed_drilling : 123.4,
            temperature_drilling : 66.8,
            temperature_milling : 90,
            current_action : "milling"
  });
  socket.emit('live_data', {
              speed_milling : 33.4,
              speed_drilling : 123.4,
              temperature_drilling : 66.8,
              temperature_milling : 100,
              current_action : "milling"
    });

  socket.emit('material', {
        number: 4728,
        amount: 4,
        rejects: 1,
        prodtime: 22.4,
        avg_temperature_drilling: 135.6,
        avg_speed_drilling: 67.5,
        avg_temperature_milling: 111.6,
        avg_speed_milling: 88.6
    });
  },500);

setTimeout(function(){
    socket.emit('live_data', {
                speed_milling : 33.4245724,
                speed_drilling : 123.43562,
                temperature_drilling : 66.834675637,
                temperature_milling : 110.4573567,
                current_action : "milling"
      });
      socket.emit('live_data', {
                  speed_milling : 33.4,
                  speed_drilling : 123.4,
                  temperature_drilling : 66.8,
                  temperature_milling : 90,
                  current_action : "milling"
        });
        socket.emit('material', {
              number: 4728,
              amount: 4,
              rejects: 1,
              prodtime: 22.4,
              avg_temperature_drilling: 135.6111111,
              avg_speed_drilling: 67.5356356,
              avg_temperature_milling: 111.62575367,
              avg_speed_milling: 88.64634
          });
      },1000);

    setTimeout(function(){

        socket.emit('live_data', {
                    speed_milling : 33.424575368,
                    speed_drilling : 123.4245724,
                    temperature_drilling : 66.8245724,
                    temperature_milling : 150.245724,
                    current_action : "milling"
          });
          socket.emit('live_data', {
                      speed_milling : 33.4,
                      speed_drilling : 123.4,
                      temperature_drilling : 66.8,
                      temperature_milling : 90,
                      current_action : "milling"
            });
            socket.emit('live_data', {
                        speed_milling : 33.44854763524,
                        speed_drilling : 123.4356346,
                        temperature_drilling : 66.5674578,
                        temperature_milling : 150.23456,
                        current_action : "milling"
              });
              socket.emit('material', {
                    number: 4728,
                    amount: 4,
                    rejects: 1,
                    prodtime: 22.4,
                    avg_temperature_drilling: 135.6,
                    avg_speed_drilling: 67.5,
                    avg_temperature_milling: 111.6,
                    avg_speed_milling: 88.6
                });
    },1500);
*/

  consumer.on('message', function(data) {
    var value = JSON.parse(data.value);
    switch (data.topic) {
      case "live":
                        if (value.live_data){
                          socket.emit('live_data', value.live_data);
                        }
                        break;
      case "customer":
                        value.salt = salt;
                        salt = salt + 1;
                        socket.emit("customer", value);
                        break;
      case "material":
                        value.salt = salt;
                        salt = salt + 1;
                        value.prodtime = Math.round(value.prodtime * 100) / 100;
                        value.avg_temperature_drilling = Math.round(value.avg_temperature_drilling * 100) / 100;
                        value.avg_speed_drilling = Math.round(value.avg_speed_drilling * 100) / 100;
                        value.avg_temperature_milling = Math.round(value.avg_temperature_milling * 100) / 100;
                        value.avg_speed_milling = Math.round(value.avg_speed_milling * 100) / 100;
                        socket.emit('material', value);
                        break;
      case "charts":
                        socket.emit("charts", value);
                        break;
    }
    console.log("Incoming | Topic: " + data.topic + " -- Message: " + JSON.stringify(value));

/*
    if (value.live_data){
      socket.emit('live_data', value.live_data);
    }

    if (value.amountorderedmaterial){
      socket.emit('customer', value);
    }
*/



/*
{
       number: 4717,
       amountorders: 2,
       materialnumber: 1757,
       avgrejects: 0.3,
       amountorderedmaterial: 21
}
*/
 });

/*
  consumerLive.on('message', function(data) {


    if (value.live_data){
      socket.emit('live_data', value.live_data);
    }
  });


  consumerMaterial.on('message', function(data) {
    var value = JSON.parse(data.value);

    console.log(value);

    socket.emit('material', value);

  });

  consumerCustomer.on('message', function(data) {
    var value = JSON.parse(data.value);

    console.log(value);

    socket.emit('customer', value);

  });


  consumerCharts.on('message', function(data) {
    var value = JSON.parse(data.value);

    console.log(value);

  //  socket.emit('charts', value);

  });
*/
  });

    // Constants
    const PORT = 8080;
    server.listen(PORT);
    console.log('Webserver: Running on http://localhost: 49160');

},300000); //300000
