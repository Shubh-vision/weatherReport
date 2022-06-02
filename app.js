const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res){
   
    const query = req.body.cityName;
    const apikey = "9c1570ce6967ab40facfa518ec8b784e";
    const units = "metric";
    
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+ "&appid="+ apikey +"&units=" + units;
    
        https.get(url, function(response){
            console.log(response.statusCode);
    
            response.on("data", function(data){
               const weatherData =  JSON.parse(data)
               const temp = weatherData.main.temp;
               const weatherDescription = weatherData.weather[0].description;
               const icon = weatherData.weather[0].icon
               const imageUrl = 
    
    res.write("<p>The weather is currently " + weatherDescription + "</p>");
    res.write("<h1> The temperature in " +  query +" currently " +temp + "</h1>");
            res.send()
            })
        })
    

})





app.listen(3000, function() {
    console.log("Running on 3000 port");
})