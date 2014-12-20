var React       = require('react');
var DeckList    = require('components/deck/deckList');
var DeckActions = require('actions/DeckActions');

// var deck1 = require('decks/1');
// DeckActions.update(1, deck1);

React.render(
  <DeckList id={ 1 } />,
  document.getElementById('app')
);

