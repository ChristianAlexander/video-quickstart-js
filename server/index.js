"use strict";

/**
 * Load Twilio configuration from .env config file - the following environment
 * variables should be set:
 * process.env.TWILIO_ACCOUNT_SID
 * process.env.TWILIO_API_KEY
 * process.env.TWILIO_API_SECRET
 */
require("dotenv").load();

var http = require("http");
var path = require("path");
var AccessToken = require("twilio").jwt.AccessToken;
var VideoGrant = AccessToken.VideoGrant;
var express = require("express");
var randomName = require("./randomname");

// Create Express webapp.
var app = express();

// Set up the paths for the examples.
[
  "bandwidthconstraints",
  "codecpreferences",
  "localvideofilter",
  "localvideosnapshot",
  "mediadevices"
].forEach(function(example) {
  var examplePath = path.join(__dirname, `../examples/${example}/public`);
  app.use(`/${example}`, express.static(examplePath));
});

// Set up the path for the quickstart.
var quickstartPath = path.join(__dirname, "../quickstart/public");
app.use("/quickstart", express.static(quickstartPath));

// Set up the path for the examples page.
var examplesPath = path.join(__dirname, "../examples");
app.use("/examples", express.static(examplesPath));

/**
 * Default to the Quick Start application.
 */
app.get("/", function(request, response) {
  response.redirect("/quickstart");
});

// Create http server and run it.
var server = http.createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log("Express server running on *:" + port);
});
