var React = require('react');
var Types = React.PropTypes;
var cx    = React.addons.classSet;

var Draggable = React.createClass({

  propTypes: {
    onDrop  : Types.func.isRequired,
    message : Types.any.isRequired
  },

  getDefaultProps() {
    return {
      dropEffect    : 'copy',
      effectAllowed : 'all'
    }
  },

  getInitialState() {
    return {
      dragging  : false,
      droppable : false
    }
  },

  render() {
    var className = cx(this.props.className, cx({
      'Draggable'           : true,
      'Draggable--dragging'  : this.state.dragging,
      'Draggable--droppable' : this.state.droppable
    }));

    return (
      <div className={ className }
           onDragOver={ this._onDragOver }
           onDragLeave={ this._onDragLeave }
           onDrop={ this._onDrop }
           onDragStart={ this._onDragStart }
           onDragEnd={ this._onDragEnd }
           draggable>
        <div className="Draggable-children">{ this.props.children }</div>
      </div>
    );
  },

  _onDragStart(e) {
    var { message, dropEffect, effectAllowed } = this.props;

    e.dataTransfer.setData('text/plain', JSON.stringify(message));
    e.dataTransfer.dropEffect = dropEffect;
    e.dataTransfer.effectAllowed = effectAllowed;

    this.setState({ dragging: true });
  },

  _onDragEnd(e) {
    e.preventDefault();
    this.setState({ droppable: false, dragging: false });
  },

  _onDragOver(e) {
    e.preventDefault();
    this.setState({ droppable: true });
  },

  _onDragLeave(e) {
    e.preventDefault();
    this.setState({ droppable: false });
  },

  _onDrop(e) {
    e.preventDefault();

    var message  = JSON.parse(e.dataTransfer.getData('text/plain'));
    var receiver = this.props.message;

    this.props.onDrop(message, receiver);
    this.setState({ droppable: false, dragging: false });
  }

});

module.exports = Draggable;