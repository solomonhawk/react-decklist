var Reflux      = require('reflux');
var request     = require('superagent');
var RSVP        = require('rsvp');
var Promise     = RSVP.Promise;
var CardActions = require('actions/CardActions');
var Sync        = require('lib/Sync');

var CardStore = Reflux.createStore({

  listenables: CardActions,

  init() {
    this.cards = {};
  },

  onGet(id) {
    if (this.cards[id]) return this.cards[id];

    return Sync.getCard(id)
      .then(this._getComplete.bind(this, id), this._getError);
  },

  _getComplete(data) {
    this.trigger(data);
  },

  onGetMany(ids) {
    var promises = ids.map(function(id) {
      return Sync.getCard(id)
        .then(function(data) {
          return { id: id, data: data[0] };
        });
    });

    RSVP.all(promises)
      .then(this._getManyComplete, this._getManyError);
  },

  _getManyComplete(data) {
    data.map(function(card) {
      this.cards[card.id] = this.cards[card.id] || card.data;
    }, this);

    this.trigger(data);
  },

  _syncComplete(id, data) {
    this.cards[id] = data[0];

    this.trigger({
      id: id,
      data: this.cards[id]
    });
  },

  _syncError(message) {
    this.trigger({error: message})
  }

});

module.exports = CardStore;
