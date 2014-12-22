var React = require('react/addons');
var Types = React.PropTypes;

var vh = document.documentElement.clientHeight / 100;

var pxToVh = function(px) {
  return parseInt(px, 10) / vh;
}

var clamp = function(pct) {
  if (pct < 3) return 3;
  if (pct > 97) return 97;
  return pct;
}

var sum = function(arr) {
  return arr.reduce(function(p, c) { return p + c; }, 0);
}

var ResizablePanel = React.createClass({

  propTypes: {
    children: Types.arrayOf(Types.element).isRequired
  },

  getDefaultProps() {
    return {
      heights: ['68%', '15%', '15%'],
      dividerHeight: '1%'
    };
  },

  getInitialState() {
    return {
      currentHandle : null,
      mouseDown     : false,
      resizing      : false,
      moving        : false,
      heights       : this.props.heights
    };
  },

  componentDidMount() {
    var p = this.refs.base.getDOMNode().getBoundingClientRect();

    this.baseData = {
      cx: p.left, cy: p.top,
      height: p.bottom - p.top,
      width: p.right - p.left
    }

    this.pctToPx = function(pct) {
      return parseInt(pct, 10) / 100 * this.baseData.height;
    };

    this.pxToPct = function(px) {
      return Math.round(parseInt(px, 10) / this.baseData.height * 1000) / 10;
    };
  },

  render() {
    var children = this.props.children.map(function(child, i) {
      var listItem = [];

      if (i > 0) {
        listItem.push(
          <li className="ResizablePanel-DragHandle"
              onMouseDown={ this._onMouseDown }
              style={{ height: this.props.dividerHeight }}
              data-id={ i - 1 } />
        );
      }

      listItem.push(
        <li className="ResizablePanel-Item"
            style={{ height: this.state.heights[i] }}
            data-id={ i }>

          { child }

        </li>
      );

      return (
        { listItem }
      );
    }, this)

    return (
      <ul className="ResizablePanel"
          onMouseMove={ this._onMouseMove }
          onMouseUp={ this._onMouseUp }
          ref="base">

        { children }

      </ul>
    );
  },

  _onMouseDown(e) {
    e.preventDefault();

    this.lastPosition  = { x: e.screenX, y: e.screenY };
    this.currentHandle = parseInt(e.target.getAttribute('data-id'), 10);
    this.lastHeights   = this.state.heights;

    this.setState({
      mouseDown     : true
    });
  },

  _onMouseUp(e) {
    this.lastPosition = null;

    this.setState({
      moving    : false,
      resizing  : false,
      mouseDown : false
    })
  },

  _onMouseMove(e) {
    e.preventDefault();

    if (this.state.mouseDown) {
      this._onResize(e);
    }
  },

  _onResize(e) {
    var { x, y } = this.lastPosition;

    this.delta = {
      x: x - e.screenX,
      y: y - e.screenY
    }

    var index    = this.currentHandle;
    var heights  = this.lastHeights.map(function(v) { return parseInt(v, 10); });
    var deltaY   = Math.round(this.delta.y * 10) / 10;

    heights[index]   = clamp(heights[index]   - this.pxToPct(deltaY));
    heights[index+1] = clamp(heights[index+1] + this.pxToPct(deltaY));

    var correction = (100 - sum(heights)) / heights.length;

    heights = heights.map(function(val) { return val + correction + '%'; });

    this.setState({
      moving   : true,
      resizing : true,
      heights  : heights
    });
  }

});

module.exports = ResizablePanel;

