var React = require('react');
var Types = React.PropTypes;

var SelectInput = React.createClass({
  propTypes: {
    onChange: Types.func.isRequired
  },

  getDefaultProps() {
    return {
      options: [],
      allowBlank: true,
      value: 0
    }
  },

  render() {
    var { id, name, options, value, ...props } = this.props;

    var options = options.map(function(data, i) {
      return (
        <option key={ i } value={ data.value }>{ data.text }</option>
      )
    }, this);

    if (this.props.allowBlank) {
      options.unshift(<option value="null"></option>)
    }

    return (
      <select
        value={ value }
        name={ name || id }
        id={ id || name }
        { ...props }>

        { options }

      </select>
    )
  }
});

module.exports = SelectInput;
