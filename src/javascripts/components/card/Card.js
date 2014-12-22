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
      zoomed: false
    }
  },

  render: function() {
    var classes = cx({
      "Card--zoom": this.state.zoomed
    });

    return (
      <div className={ "Card " + classes }
           onMouseMove={ this._onMouseMove }
           onMouseEnter={ this._onMouseEnter }
           onMouseLeave={ this._onMouseLeave }
           onMouseDown={ this._onMouseDown }
           onMouseUp={ this._onMouseUp }>

        <img alt={ this.props.data.name }
             src={ this.props.data.editions[0].image_url || DEFAULT_CARD_IMG_URL } />

      </div>
    );
  },

  _onMouseMove: function(e) {
    if (this.state.mouseDown) {
      this.setState({ zoomed: false });
    }
  },

  _onMouseLeave: function(e) {
    this.setState({ zoomed: false });
  },

  _onMouseDown: function(e) {
    this.setState({ zoomed: true, mouseDown: true });
  },

  _onMouseUp: function(e) {
    this.setState({ zoomed: false, mouseDown: false });
  }
});

module.exports = Card;
