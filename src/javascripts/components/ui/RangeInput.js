var React = require('react/addons');
var Types = React.PropTypes;

var RangeInput = React.createClass({

  propTypes: {
    onChange: Types.func.isRequired
  },

  getDefaultProps() {
    return {
      className : '',
      name      : '',
      id        : null,
      step      : 1,
      value     : 0,
      min       : 0,
      max       : 10
    };
  },

  render() {
    var { className, onChange, step, name, id, value, from, to } = this.props;

    var props = {
      defaultValue : value,
      className    : 'RangeInput ' + className,
      onChange     : onChange,
      name         : name || id,
      type         : 'range',
      step         : step,
      min          : from,
      max          : to,
      id           : id || name
    }

    return (
      <input { ...props } />
    );
  }
});

module.exports = RangeInput;
