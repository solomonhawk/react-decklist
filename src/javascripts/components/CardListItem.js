var React    = require('react/addons');
var Sortable = require('mixins/Sortable');
var Pure     = React.addons.PureRenderMixin;

var cx       = React.addons.classSet;

var CardListItem = React.createClass({

  mixins: [Pure, Sortable],

  render: function() {
    var classes = cx({
      "-dragging": this.isDragging()
    });

    return (
      <li className={ "CardList-Item " + classes } { ...this.props }>
        { this.props.children }
      </li>
    )
  }
});

module.exports = CardListItem;
