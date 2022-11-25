/**
 * IMPORTANT: I've isolated the geolocation stuff to this file for now, just to keep it separate from our main server.js.
 * 
 * This file needs to be run from the command line instead of server.js for geolocation data to be served.
 * 
 * It can be easily moved elsewhere when we have a better idea on how to set up our routes.
 *  */ 
const unirest = require("unirest");
const express = require("express");
const router = express.Router();
const app = express();
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

router.get("/geolocation", (req, res) => {
    const apiCall = unirest("GET", "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/");
    apiCall.query({
      "ip": "142.109.127.37"
    });

    apiCall.headers({
      "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
      "x-rapidapi-key": "6960f52de6msh9db305e6cdd65fbp1965aejsn85a8048f9529",
      "useQueryString": true
    });

    apiCall.end(function (result) {
      res.send(result.body);
    })
});