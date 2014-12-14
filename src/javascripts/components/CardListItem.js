var React    = require('react');
var Sortable = require('mixins/Sortable');

var CardListItem = React.createClass({

  mixins: [Sortable]

  getInitialState: function() {
    return {
      children: this.props.children
    }
  },

  render: function() {
    return (
      <li className="CardList-Item" {...this.props} data-id={ i } key={ i }>
        { this.props.children }
      </li>
    )
  }
});

module.exports = CardListItem;
