var React        = require('react/addons');
var CardListItem = require('components/card/CardListItem');
var Pure         = React.addons.PureRenderMixin;

var CardList = React.createClass({

  mixins: [Pure],

  getDefaultProps() {
    return {
      cards: []
    }
  },

  render() {
    var createListItem = function(card, i) {
      return (
        <CardListItem card={ card } key={ i } />
      )
    };

    return (
      <ul className="CardList">
        { this.props.cards.map(createListItem) }
      </ul>
    )
  }

});

module.exports = CardList;
