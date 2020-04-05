const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/",function(req,res){
   const city = req.body.cityName;
   const api_key = "4bf4d2021de3b88a93c35ce28d7a972e";
   const unit = "metric";

   const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ api_key +"&units=" + unit
    //const url ="https://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4bf4d2021de3b88a93c35ce28d7a972e"
    https.get(url,function(response){
      console.log(response.statusCode);

      response.on("data", function(data){
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp;
        const weatherDescription = weatherData.weather[0].description;
        const icon = weatherData.weather[0].icon;
    //  const imageURL = "http://openweathermap.org/img/wn/10d@2x.png"
        const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
        res.write("<p> The weather is currently "+ weatherDescription +"<p>");
        res.write("<h1> The temperature in "+city+" is "+ temp+" degress Celcius.</h1>");
        res.write("<img src=" +imageURL +">");
        res.send();
      });

    });

  });


app.listen(3000, function(){
  console.log("server started on port 3000")
});
