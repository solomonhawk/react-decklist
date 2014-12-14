var $ = require('jquery');
var React = require('react/addons');

var cx = React.addons.classSet;

IMAGE_API_URL        = "http://mtgimage.com/multiverseid/";
CARD_API_URL         = "https://api.deckbrew.com/mtg/cards";
DEFAULT_CARD_IMG_URL = "/src/images/Card--default.png";

var getCardData = function(id) {
  return $.get(CARD_API_URL + '?multiverseid=' + id)
    .then(function (response) {
      return $.Deferred(function (deferred) {
        if (!response.length) {
          return deferred.reject("No results found.")
        }

        deferred.resolve(response[0]);
      }).promise();
    });
}

var Card = React.createClass({

  getDefaultProps: function () {
    return {
      name: ''
    }
  },

  getInitialState: function() {
    return {
      name          : this.props.data.name,
      zoomed        : false,
      revealed      : false,
      multiverse_id : this.props.data.multiverse_id,
      image_url     : DEFAULT_CARD_IMG_URL
    }
  },

  componentWillMount: function() {
    getCardData(this.state.multiverse_id)
      .done(function(data) {
        this.setState(data || {});
      }.bind(this))

      .fail(function(data) {
        this.setState({ error: data })
      }.bind(this));

    this.loadApiImage(this.state.multiverse_id);
  },

  render: function() {
    var classes = cx({
      "Card--hover" : this.state.revealed,
      "Card--zoom"  : this.state.zoomed
    });

    return (
      <div className={ "Card " + classes }
           onMouseEnter={ this.onMouseEnter }
           onMouseLeave={ this.onMouseLeave }
           onMouseDown={ this.onMouseDown }
           onMouseUp={ this.onMouseUp }>

        <img alt={ this.state.name }
             src={ this.state.image_url } />

      </div>
    );
  },

  loadApiImage: function(id) {
    var img = new Image();

    img.onload = function() {
      this.setState({ image_url: img.src });
    }.bind(this);

    img.src = IMAGE_API_URL + id + '.jpg';
  },

  onMouseEnter: function(e) {
    this.setState({ revealed: true });
  },

  onMouseLeave: function(e) {
    this.setState({ revealed: false, zoomed: false });
  },

  onMouseDown: function(e) {
    this.setState({ zoomed: true });
  },

  onMouseUp: function(e) {
    this.setState({ zoomed: false });
  }
});

module.exports = Card;
