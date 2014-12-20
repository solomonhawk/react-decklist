var hasOwnProp = Object.hasOwnProperty;

var getValue = function(item, key) {
  if (typeof item[key] == 'array') {
    return item[key][0];
  } else {
    return item[key];
  }
};

/*
 * @param list   array of objects
 * @param key    string the key of the object to sort by
 * @param order  string 'ASC' || 'DSC'
 * @return 2d array "list of cardLists"
*/

var Sort = {
  types: {
    ASC  : 'asc',
    DESC : 'desc'
  },

  byName(list, order) {
    return Sort._byKey(list, 'name', order);
  },

  byType(list, order) {
    return Sort._byKey(list, 'types', order);
  },

  byColor(list, order) {
    return Sort._byKey(list, 'color', order);
  },

  byCmc(list, order) {
    return Sort._byKey(list, 'cmc', order);
  },

  byNone(list) {
    return list;
  },

  // private

  _byKey(list, key, order) {
    console.log(order);
    var sorted = list.sort(Sort._keyCompare.bind(this, key));
    var grouped = Sort._groupBy(sorted, key);
    return order == Sort.types.ASC ? grouped : grouped.reverse()
  },

  _keyCompare(key, a, b) {
    if (getValue(a, key) > getValue(b, key)) return 1;
    if (getValue(a, key) < getValue(b, key)) return -1;
    return 0;
  },

  _groupBy(list, key) {
    var groups = {};
    var result = [];

    list.map(function(card) {
      var k = String(card[key]);
      (hasOwnProperty.call(groups, k) ? groups[k] : groups[k] = []).push(card);
    });

    Object.keys(groups).map(function(key, i) {
      result.push(groups[key]);
    });

    return result;
  }
}

module.exports = Sort;
