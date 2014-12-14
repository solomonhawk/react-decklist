var React = require('react');
var seeds = require('seeds');
var DeckList = require('components/deckList');

console.log(seeds);

React.render(
  <DeckList cardLists={ seeds } />,
  document.getElementById('app')
);
