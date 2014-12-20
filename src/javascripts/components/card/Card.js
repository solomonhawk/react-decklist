var React       = require('react/addons');
var Reflux      = require('reflux');
var CardActions = require('actions/CardActions');
var CardStore   = require('stores/CardStore');
var Pure        = React.addons.PureRenderMixin;
var cx          = React.addons.classSet;

var DEFAULT_CARD_IMG_URL = "/src/images/Card--default.png";

var Card = React.createClass({

  mixins: [Pure],

  getInitialState: function() {
    return {
      zoomed    : false,
      revealed  : false
    }
  },

  render: function() {
    var classes = cx({
      "Card--hover" : this.state.revealed,
      "Card--zoom"  : this.state.zoomed
    });

    return (
      <div className={ "Card " + classes }
           onMouseMove={ this.onMouseMove }
           onMouseEnter={ this.onMouseEnter }
           onMouseLeave={ this.onMouseLeave }
           onMouseDown={ this.onMouseDown }
           onMouseUp={ this.onMouseUp }>

        <img alt={ this.props.data.name }
             src={ this.props.data.editions[0].image_url || DEFAULT_CARD_IMG_URL } />

      </div>
    );
  },

  onMouseMove: function(e) {
    if (this.state.mouseDown) {
      this.setState({ zoomed: false, revealed: false });
    }
  },

  onMouseEnter: function(e) {
    this.setState({ revealed: true });
  },

  onMouseLeave: function(e) {
    this.setState({ revealed: false, zoomed: false });
  },

  onMouseDown: function(e) {
    this.setState({ zoomed: true, mouseDown: true });
  },

  onMouseUp: function(e) {
    this.setState({ zoomed: false, mouseDown: false });
  }
});

module.exports = Card;
