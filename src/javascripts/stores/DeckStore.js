var _           = require('util');
var Sync        = require('lib/Sync');
var Reflux      = require('reflux');
var DeckActions = require('actions/DeckActions');
var CardActions = require('actions/CardActions');
var CardStore   = require('stores/CardStore');
var RSVP        = require('rsvp');

var DeckStore = Reflux.createStore({
  listenables: [DeckActions],

  init() {
    this.currentId = null;
    this.deck      = null;

    this.listenTo(CardStore, this._onCardsChanged);
  },

  onGet(id) {
    if (id == this.currentId) return this.deck;
    Sync.getDeck(id).then(this._syncDeckComplete.bind(this, id), this._syncError);
  },

  onUpdate(id, data) {
    return Sync.setDeck(id, data).then(this._syncDeckComplete.bind(this, id), this._syncError);
  },

  addCard(id) {

  },

  removeCard() {

  },

  _syncDeckComplete(id, data) {
    this.currentId = id;
    this.deck = data;
    this.deck.cardData = {};

    CardActions.getMany(_.uniq(data.mainDeck));
  },

  _onCardsChanged(cards) {
    cards.map(function(card) {
      this.deck.cardData[card.id] = card.data;
    }, this);

    this.deck.mainDeck.forEach(function(id, i, arr) {
      arr[i] = this.deck.cardData[id];
    }, this);

    this.trigger(this.deck);
  },

  _syncError(message) {
    DeckActions.error(message);
  }

});

module.exports = DeckStore;
