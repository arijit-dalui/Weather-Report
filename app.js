const express = require("express");

const https = require("https");

const bodyparser = require("body-parser");

const app=express();

app.use(bodyparser.urlencoded({extended:true}));

app.get('/',function(request,res){
  res.sendFile(__dirname+"/index.html");
})

app.post('/',function(request,res){
  const query = request.body.Cityname;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=a0356f20ac064123348059107ca58cbc&units=metric";
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherdata = JSON.parse(data)

      const temp1 = weatherdata.main.temp

      const cloud = weatherdata.weather[0].description

      const icon = weatherdata.weather[0].icon

      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

      res.write("<p> The weather is currently: " + cloud +"<p>");
      res.write("<h1> The temparature of "+query+" is: "+temp1+" degrees. </h1>");
      res.write("<img src=" + imageurl + ">");
      res.send()
    })
  })
})




app.listen(3000,function(){
  console.log("Server is running at port 3000.")
})
