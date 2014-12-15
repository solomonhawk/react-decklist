var React       = require('react');
var CardList    = require('components/CardList');

var DeckList = React.createClass({

  getInitialState: function() {
    return {
      currentDragItem : null,
      columnCount     : this.props.cardLists.length,
      cardLists       : this.props.cardLists
    }
  },

  render: function() {
    var createList = function(list, i) {
      return (
        <li className="DeckList-Item" data-id={ i } key={ i }>
          <CardList cards={ list.cards } />
        </li>
      );
    };

    return (
      <ul className="DeckList">
        { this.state.cardLists.map(createList) }
      </ul>
    )
  }
});

module.exports = DeckList;
