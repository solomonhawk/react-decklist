var React = require('react');

var StateView = React.createClass({
  render: function() {
    return (
      <pre>{JSON.stringify(this.props.data, 0, 2)}</pre>
    )
  }
});

module.exports = StateView;
