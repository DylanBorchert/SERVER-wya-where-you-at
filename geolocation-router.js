/**
 * IMPORTANT: I've isolated the geolocation stuff to this file for now, just to keep it separate from our main server.js.
 * 
 * This file needs to be run from the command line instead of server.js for geolocation data to be served.
 * 
 * It can be easily moved elsewhere when we have a better idea on how to set up our routes.
 *  */ 
const express = require("express");
const router = express.Router();
const app = express();
app.use("/", router);
app.listen(5000, () => console.log("Server Running"));

router.get("/geolocation", (req, res) => {
  res.send("Hello World");
});