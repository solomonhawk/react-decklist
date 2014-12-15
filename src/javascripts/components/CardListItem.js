var React    = require('react/addons');
var Card     = require('components/Card');
var Sortable = require('mixins/Sortable');
var Pure     = React.addons.PureRenderMixin;
var cx       = React.addons.classSet;

var DEFAULT_CARD_IMG_URL = "/src/images/Card--default.png";

var CardListItem = React.createClass({

  mixins: [Pure, Sortable],

  render: function() {
    var classes = cx({
      "-dragging": this.isDragging()
    });

    return (
      <li className={ "CardList-Item " + classes } { ...this.props } ref="listItem">
        <Card data={ this.props.item } />
      </li>
    )
  }

  // placeholder: function(e, el) {
  //   var cardImage = el.getElementsByTagName('img')[0];
  //   var canvas    = document.getElementById('canvas');
  //   var img       = document.createElement('img');
  //   var ctx       = canvas.getContext('2d');

  //   canvas.width = 96;
  //   canvas.height = 128;

  //   ctx.drawImage(cardImage, 0, 0, canvas.width, canvas.height);

  //   CORS Headers disallow `canvas.toDataURL()` :(

  //   img.src = canvas.toDataURL('image/png');
  //   img.crossOrigin = 'Anonymous';

  //   e.dataTransfer.setDragImage(img, 0, 0);
  // }
});

module.exports = CardListItem;
