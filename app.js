const express=require("express");
const app=express();

const bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const https=require("https");

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="45a2fb5d5bbda0fb58cf89b9d61ffaca";
  const unit="metric";
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data);
      const temp=weatherData.main.temp;
      const weatherDescription=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temperature in "+query+" is "+temp+" degrees Celcius.</h1>");
      res.write("<p>The weather is currently "+weatherDescription+".</p>");
      res.write("<img src="+imageurl+">");
      res.send();
    });
  });
});

app.listen(process.env.PORT || 3000,function(){
  console.log("server is running on port 3000.");
});
