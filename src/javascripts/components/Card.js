var React       = require('react/addons');
var Reflux      = require('reflux');
var CardActions = require('actions/CardActions');
var CardStore   = require('stores/CardStore');
var equal       = require('deep-equal');
var Pure        = React.addons.PureRenderMixin;
var cx          = React.addons.classSet;

var DEFAULT_CARD_IMG_URL = "/src/images/Card--default.png";


var Card = React.createClass({

  mixins: [Pure],

  getDefaultProps: function () {
    return {
      name: ''
    }
  },

  getInitialState: function() {
    return {
      zoomed    : false,
      revealed  : false,
      image_url : this.props.data.image_url || DEFAULT_CARD_IMG_URL
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
             src={ this.state.image_url } />

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
