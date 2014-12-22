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
    Sync.getDeck(id)
      .then(
        this._syncDeckComplete.bind(this, id),
        this._syncError
      );
  },

  onUpdate(id, data) {
    Sync.setDeck(id, data)
      .then(
        this._syncDeckComplete.bind(this, id),
        this._syncError
      );
  },

  addCard(id) {

  },

  removeCard() {

  },

  _syncDeckComplete(id, data) {
    this.currentId = id;
    this.deck      = data;
    this.data      = {};

    var cards = _.uniq(
      [].concat(
        data.mainBoard,
        data.sideBoard,
        data.maybeBoard
      )
    );

    CardActions.getMany(cards);
  },

  _onCardsChanged(cards) {
    cards.map(function(card) {
      this.data[card.id] = card.data;
    }, this);

    this.deck.mainBoard.forEach(this._extractData, this);
    this.deck.sideBoard.forEach(this._extractData, this);
    this.deck.maybeBoard.forEach(this._extractData, this);

    this.trigger(this.deck);
  },

  _extractData(id, i, arr) {
    arr[i] = this.data[id];
  },

  _syncError(message) {
    DeckActions.error(message);
  }

});

module.exports = DeckStore;
