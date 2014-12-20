var Reflux = require('reflux');

var DeckActions = Reflux.createActions([
  'get',
  'update',
  'addCard',
  'removeCard',
  'error'
]);

module.exports = DeckActions;
