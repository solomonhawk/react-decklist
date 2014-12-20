var React    = require('react/addons');
var Card     = require('components/card/Card');
// var Sortable = require('mixins/Sortable');
var Pure     = React.addons.PureRenderMixin;
var cx       = React.addons.classSet;

var CardListItem = React.createClass({

  mixins: [Pure],

  getDefaultProps() {
    return {
      card: {}
    }
  },

  render: function() {
    return (
      <li className="CardList-Item" ref="listItem">
        <Card data={ this.props.card } />
      </li>
    )
  }

});

module.exports = CardListItem;
