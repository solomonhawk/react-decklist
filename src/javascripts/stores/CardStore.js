var Reflux      = require('reflux');
var request     = require('superagent');
var RSVP        = require('rsvp');
var Promise     = RSVP.Promise;
var CardActions = require('actions/CardActions');

IMAGE_API_URL = "http://mtgimage.com/multiverseid/"; // + id + ".jpg"
CARD_API_URL  = "https://api.deckbrew.com/mtg/cards"; // "?multiverse_id=" + id

var getImageUrl = function(id) {
  return IMAGE_API_URL + id + '.jpg'
}

var getCardEndpointUrl = function(id) {
  return CARD_API_URL + '?multiverseid=' + id
}

var CardStore = Reflux.createStore({

  listenables: CardActions,

  init: function() {
    this.cards = {};
  },

  onGetCards: function(ids) {
    this.fetchMany(ids)
      .then(
        this.updateCards.bind(this, ids),
        this.triggerError
      );
  },

  updateCards: function(cards, data) {
    cards.map(function(card, i) {
      this.cards[cards[i]] = data[i][0];
      this.cards[cards[i]].image_url = getImageUrl(cards[i]);
      this.cards[cards[i]].multiverse_id = cards[i];
    }, this);

    this.trigger(this.cards);
  },

  triggerError: function(data) {
    this.trigger({ error: data });
  },

  fetchOne: function(id) {
    return new Promise(function(resolve, reject) {
      if (this.cards[id] !== undefined) {
        resolve(this.cards[id]);
      } else {
        request.get(getCardEndpointUrl(id), function(res) {
          resolve(res.body);
        });
      }
    }.bind(this));
  },

  fetchMany: function(ids) {
    return RSVP.all(ids.map(this.fetchOne));
  }

});

module.exports = CardStore;
