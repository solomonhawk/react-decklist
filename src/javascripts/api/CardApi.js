var request = require('superagent');
var RSVP    = require('rsvp');
var Promise = RSVP.Promise;

var IMAGE_API_URL = "http://mtgimage.com/multiverseid/"; // + id + ".jpg"
var CARD_API_URL  = "https://api.deckbrew.com/mtg/cards"; // "?multiverse_id=" + id

var getImageUrl = function(id) {
  return IMAGE_API_URL + id + '.jpg'
}

var getCardEndpointUrl = function(id) {
  return CARD_API_URL + '?multiverseid=' + id
}

var API = {
  fetch(id) {
    return new Promise(function(resolve, reject) {
      request.get(getCardEndpointUrl(id), function(res) {
        if (!res || res.error) reject(res.error || res.body);
        resolve(res.body);
      });
    });
  }
}

module.exports = API;
