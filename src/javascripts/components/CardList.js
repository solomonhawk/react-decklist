var React        = require('react');
var Reflux       = require('reflux');
var Card         = require('components/Card');
var CardListItem = require('components/CardListItem');
var CardStore    = require('stores/CardStore');
var CardActions  = require('actions/CardActions');
var StateView    = require('components/StateView');

var CardList = React.createClass({

  mixins: [Reflux.ListenerMixin],

  getInitialState: function() {
    return {
      data: { items: this.props.cards }
    }
  },

  componentDidMount: function() {
    this.listenTo(CardStore, this.onCardStoreChange);

    this.ids = this.props.cards.map(function(card) {
      return card.multiverse_id;
    });

    CardActions.getCards(this.ids);
  },

  onCardStoreChange: function(newData) {
    var data = { items: [] };

    this.ids.map(function(id) {
      data.items.push(newData[id]);
    });

    this.setState({ data: data });
  },

  render: function() {
    var createListItem = function(card, i) {
      return (
        <CardListItem
          sort={ this.sort }
          data={ this.state.data }
          key={ i }
          item={ card }>

          <Card data={ card } />

        </CardListItem>
      )
    };

    return (
      <div>
        <ul className="CardList">
          { this.state.data.items.map(createListItem, this) }
        </ul>
        <StateView data={ this.state.data } />
      </div>
    )
  },

  sort: function(items, dragging) {
    this.setState({
      data: {
        items: items,
        dragging: dragging
      }
    });
  }
});

module.exports = CardList;
