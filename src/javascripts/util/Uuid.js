module.exports = (function() {

  var count = 0;

  function next() {
    return count++;
  }

  return next;
})();
