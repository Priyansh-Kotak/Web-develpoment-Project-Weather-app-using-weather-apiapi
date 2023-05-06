const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));


app.get("/",(req,res)=>{
    
    res.sendFile(__dirname+"/index.html");

})

app.post("/",(req,res)=>{
    
    console.log(req.body.city);
    console.log("PArser is started");
    const city = req.body.city;

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+ city +  "&appid=0ff6729f60d1bb2257de1b9128124ae1";

    console.log(url);
    https.get(url,(response)=>{

        response.on("data",(data)=>{

            const weather = JSON.parse(data);

            const temp = (weather.main.temp) - 273;
            // temp = temp - 273.15;
            const icon = weather.weather[0].icon;
            const imgUrl = "https://openweathermap.org/img/wn/"+ icon+"@2x.png";

            // const city =req.body.city;

            res.write("<h1>Temperature of the "+city+" is "+temp+" degree celcius");
            res.write("<img src="+imgUrl+">");
            res.send();
        })
    })

})


// app.get("/",(req,res)=>{

//     const url = "https://api.openweathermap.org/data/2.5/weather?q=Jamnagar&appid=0ff6729f60d1bb2257de1b9128124ae1";

//     https.get(url,(response)=>{
//         console.log(response.statusCode);

//         response.on("data",(data)=>{
//             const weayher = JSON.parse(data); 

//             // const obj = {
//             //     name:"Priyansh",
//             //     hobbie :"Coding",
//             //     future:"GOOGLE"

//             // };

//             const temp = weayher.main.temp;
            
//             console.log(temp);
//         })
//     })

//     res.send("Server is running ");
// })








/*

app.get("/",(req,res)=>{


    const url = "https://api.openweathermap.org/data/2.5/weather?q=Jamnagar&appid=0ff6729f60d1bb2257de1b9128124ae1";

    const name = req.body.city;

    // res.send(name);

    console.log(name);



    https.get(url,(response)=>{
        console.log(response.statusCode);

        const name =req.body.city;
        console.log(name);

        response.on("data",(data)=>{ 
            const weather = JSON.parse(data);
            console.log(weather);

            const temp = weather.main.temp;
            const city = weather.name;

            const icon = weather.weather[0].icon;

            const imgUrl ="https://openweathermap.org/img/wn/" + icon + "@2x.png" 

            console.log(temp);

            res.write("<p>The condiition of the weather is "+weather.weather[0].description);

            res.write("<h1>Temp of "+city+" is "+temp+" in kelvin</h1>");

            res.write("<img src =" +imgUrl+">");

            res.send();

        })      
    })
})

*/

app.listen(3000,()=>{
    console.log("Server is strted at 3000");
})





