var axios = require('axios');
var api = require('../../../api');

var _baseURL = api.base;
var _APIKEY = api.apikey;

function prepRouteParams (queryStringData) {
  return Object.keys(queryStringData)
    .map(function (key) {
      return key + '=' + encodeURIComponent(queryStringData[key]);
    }).join('&')
}

function prepUrl (type, queryStringData) {
  return _baseURL + type + '?' + prepRouteParams(queryStringData);
}

function getQueryStringData (city) {
  return {
    q: city,
    type: 'accurate',
    APPID: _APIKEY,
    cnt: 5
  }
}

function getCurrentWeather (city) {
  var queryStringData = getQueryStringData(city);
  var url = prepUrl('weather', queryStringData)

  return axios.get(url)
    .then(function (currentWeatherData) {
      return currentWeatherData.data
    })
}

function getForecast (city) {
  var queryStringData = getQueryStringData(city);
  var url = prepUrl('forecast/daily', queryStringData)

  return axios.get(url)
    .then(function (forecastData) {
      return forecastData.data
    })
}

module.exports = {
  getCurrentWeather: getCurrentWeather,
  getForecast: getForecast
};
