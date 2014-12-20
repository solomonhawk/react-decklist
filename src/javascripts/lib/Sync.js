var _       = require('util');
var request = require('superagent');
var Promise = require('rsvp').Promise;
var CardApi = require('api/CardApi');
var DeckApi = require('api/DeckApi');
var ls      = localStorage;

var APP_NAMESPACE   = 'dotdec';
var DECKS_NAMESPACE = 'decks';
var CARDS_NAMESPACE = 'cards';

var getLSKey = function(ns, id) {
  return `${ APP_NAMESPACE }:${ ns }:${ id }`;
}

var Sync = {
  _get(ns, id, api) {
    return new Promise(function(resolve, reject) {
      var data = JSON.parse(
        ls.getItem(getLSKey(ns, id))
      );

      if (data) {
        resolve(data);
      } else {
        api.fetch(id)
          .then(function(data) {
            Sync._set(ns, id, data);
            resolve(data);
          },
          function(data) {
            reject(data);
          });
      }
    })
  },

  _set(ns, id, data) {
    return new Promise(function(resolve, reject) {
      ls.setItem(`${ APP_NAMESPACE }:${ ns }:${ id }`, JSON.stringify(data));
      resolve(true);
    })
  },

  getDeck(id) {
    return Sync._get(DECKS_NAMESPACE, id, DeckApi);
  },

  setDeck(id, data) {
    return Sync._set(DECKS_NAMESPACE, id, data);
  },

  getCard(id) {
    return Sync._get(CARDS_NAMESPACE, id, CardApi);
  },

  setCard(id, data) {
    return Sync._set(CARDS_NAMESPACE, id, data);
  }
}

module.exports = Sync;
