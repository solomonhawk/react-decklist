var React       = require('react');
var DeckList    = require('components/deck/deckList');
var DeckActions = require('actions/DeckActions');
var AppHeader   = require('components/layout/AppHeader');
var AppFooter   = require('components/layout/AppFooter');
var SideBar     = require('components/layout/SideBar');

// var deck = require('decks/2');
// DeckActions.update(2, deck);

var App = React.createClass({

  render() {
    return (
      <div className="DotDec AppRoot">
        <AppHeader />

        <div className="Column Column-Side">
          <SideBar />
        </div>

        <div className="Column Column-Main">
          <DeckList id={ 1 } />
        </div>

        <AppFooter />
      </div>
    );
  }

});

React.render(
  <DeckList id={ 1 } />,
  document.getElementById('app')
);

