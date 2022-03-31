const express = require("express");
const https = require("https");
var bodyParser = require('body-parser')

require('dotenv').config()

const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");   
    
    // res.send("Server is up and running ok!");
})

app.post("/", function(req, res){

    const query = req.body.cityName;
    const apiKey = process.env.apiKey
    const units = "metric";
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units;
    // In express js url must start with "http://" or "https://"
    https.get(url, function(response){
        // console.log(response);

        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            var temp = weatherData.main.temp;
            var weatherDiscription = weatherData.weather[0].description;
            var icon = weatherData.weather[0].icon;
            var imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            // console.log(weatherData);
            res.write("<p>Weather discription is : " + weatherDiscription + "</p>")
            res.write("<h1>The temperature in " + query + " is : " + temp + " celcius.</h1>");
            res.write("<img src =" + imageUrl + ">");
            res.send();
        })
    });
})

app.listen(3000, function(){
    console.log("Server is started at port 3000");
})