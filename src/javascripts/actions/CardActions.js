var Reflux = require('reflux');

var CardActions = Reflux.createActions([
  'get',
  'getComplete',
  'getMany',
  'getManyComplete',
  'error'
]);

module.exports = CardActions;
