var RSVP = require('rsvp');
var Promise = RSVP.Promise;
var request = require('superagent');
var names = [
  "Ancient Tomb",
  "Ancient Tomb",
  "Ancient Tomb",
  "Buried Ruin",
  "City of Traitors",
  "City of Traitors",
  "City of Traitors",
  "Deserted Temple",
  "Maze of Ith",
  "Maze of Ith",
  "Minamo, School at Water's Edge",
  "Rishadan Port",
  "Rishadan Port",
  "Seat of the Synod",
  "Seat of the Synod",
  "Seat of the Synod",
  "Seat of the Synod",
  "Strip Mine",
  "Tolarian Academy",
  "Wasteland",
  "Wasteland",
  "Wasteland",
  "Aladdin's Ring",
  "Ancestral Vision",
  "Ancestral Vision",
  "Ancestral Vision",
  "Ancestral Vision",
  "Crucible of Worlds",
  "Crucible of Worlds",
  "Grim Monolith",
  "Grim Monolith",
  "Grim Monolith",
  "Lotus Bloom",
  "Mana Vault",
  "Mindslaver",
  "Mox Opal",
  "Smokestack",
  "Smokestack",
  "Smokestack",
  "Smokestack",
  "Sol Ring",
  "Stifle",
  "Stifle",
  "Stifle",
  "Stifle",
  "Sundial of the Infinite",
  "Sundial of the Infinite",
  "Sundial of the Infinite",
  "Sundial of the Infinite",
  "Tangle Wire",
  "Tangle Wire",
  "Tangle Wire",
  "Tangle Wire",
  "Tower of Fortunes",
  "Static Orb",
  "Static Orb",
  "Trickbind",
  "Winter Orb",
  "Winter Orb",
  "Winter Orb"
];

var promises = names.map(function(name) {
  return new Promise(function(resolve, reject) {
    request.get('http://api.deckbrew.com/mtg/cards?name=' + encodeURIComponent(name))
      .accept('json')
      .end(function(error, response) {
        if (error) reject(error);
        if (response.error) reject(response);
        resolve(response.body);
      })
  })
})

RSVP.all(promises)
  .then(function(responses) {
    // console.log(response.length, response[0].length, response);
    responses.map(function(res) {
      console.log(res[0].editions[0].multiverse_id);
    })
  })
