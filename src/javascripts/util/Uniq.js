module.exports = function uniq(arr) {
  var result = [];

  arr.map(function(item) {
    if (result.indexOf(item) < 0) {
      result.push(item);
    }
  });

  return result;
}
