//server side routes

const express = require("express");
const router = express.Router();
const request = require("request");
const City = require("../model/City");

const WEATHER_PATH = "http://api.openweathermap.org/data/2.5";
const APP_ID = "a6fb62a4df6500bb3078d7e190bd637e";

//getDataFromDB
router.get("/cities", function(req, res) {
  City.find({}, function(err, citiesResponse) {
    res.send(citiesResponse);
  });
});

//clicked search
router.get("/city/:cityName", function(req, res) {
  const cityName = req.params.cityName;
  weatherRoute = `${WEATHER_PATH}/weather?q=${cityName}&appid=${APP_ID}`;
  request(weatherRoute, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      const result = JSON.parse(body);
      res.send(result);
    }
  });
});

//clicked save
router.post("/city", function(req, res) {
  let newCity = new City({
    name: req.body.name,
    temperature: req.body.temperature,
    condition: req.body.condition,
    conditionPic: req.body.conditionPic
  });
  City.findOne({ name: newCity.name }, function(err, foundCity) {
    if (!foundCity) {
      newCity.save().then(function(city) {
        res.send(`${city.name} was added successfully!`);
      });
    } else {
      res.send(`${city.name} already exists!`);
    }
  });
});

//clicked remove
router.delete("/city/:cityName", function(req, res) {
  const city = req.params.cityName;

  City.findOne({ name: city }, function(err, foundCity) {
    if (foundCity != null) {
      console.log(`removing ${foundCity.name}`);
      foundCity.remove();
      res.send(`${city} was removed`);
    } else {
      res.send(`${city} not found`);
    }
  });
});

module.exports = router;
