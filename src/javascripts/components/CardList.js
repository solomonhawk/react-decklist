var React = require('react');
var Card = require('components/Card');

var CardList = React.createClass({

  getInitialState: function() {
    return {
      currentItem : null,
      itemCount   : this.props.cards.length,
      cards       : this.props.cards
    }
  },

  render: function() {
    var cards = this.state.cards.map(function(card, i) {
      return (
        <li className="CardList-Item" data-id={ i } key={ i }>
          <Card data={ card } />
        </li>
      )
    });

    return (
      <ul className="CardList">
        { cards }
      </ul>
    )
  }
});

module.exports = CardList;
