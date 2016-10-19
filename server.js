var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var https = require('https');
var keys  = require("./config.js");
var request = require('request');
var path = require('path');

var app = express();

var cityTest = 'SanFrancisco,us'
// http://api.openweathermap.org/data/2.5/weather?q=SanFrancisco,us&appid=83f61e001de33d8e3dfae71ec0234172
var weatherHost = 'http://api.openweathermap.org/'
var googleHost = 'https://maps.googleapis.com';
var queryWeather = weatherHost + '/data/2.5/weather?q=' + cityTest + '&appid=' + keys.weatherApi;
var queryRestaurants = googleHost + '/maps/api/place/textsearch/json?query=restaurants%7bakery+in+' + cityTest + '&key=' + keys.google;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


var publicPath = path.join(__dirname, 'public');

// We point to our static assets
app.use(express.static(publicPath));

app.get('/', function(req,res){
   console.log('inside get line 26')
  	res.send(200).end();
})

app.post('/test', function(req,res){
  console.log(req.body)
  request(queryRestaurants, function(error, resp, body){
    if(error) {
      console.log(error);
    }
    res.end(body);
  })
})

var port = process.env.PORT || 8888;

app.listen(port, function(){
	console.log("App listening on port: ", port);
});

// HANDLE THE POST FOR WEATHER:
// app.post('/test', function(req,res){
//   http.get(queryString, function(resp){
//     resp.on('data', function(chunk){
//       var body = chunk.toString('utf8');
//       res.end(body);
//     })
//   }).on('error', function(err){
//   	console.log(err);
//   })
// })
  // RESTAURANTS: GOOGLE PLACES
// https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+SanFrancisco&key=AIzaSyD0KiiFo6AdGx79uE63AF-f2r5GcmgBSqk