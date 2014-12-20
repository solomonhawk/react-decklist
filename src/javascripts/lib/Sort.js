var hasOwnProp = Object.hasOwnProperty;

var getValue = function(item, key) {
  if (typeof item[key] == 'array') {
    return item[key].sort()[0];
  } else {
    return item[key];
  }
};

/*
 * @param list   array of objects
 * @param key    string the key of the object to sort by
 * @param order  string 'ASC' || 'DSC', use Sort.order.ASC or Sort.order.DESC
 * @return array sorted array
*/
var Sort = {
  type: {
    byName  : 'byName',
    byType  : 'byType',
    byCmc   : 'byCmc',
    byColor : 'byColor'
  },

  order: {
    ASC  : 'ASC',
    DESC : 'DESC'
  },

  getSortOptions() {
    var sortOptions = [
      { value: Sort.type.byCmc,   text: 'Sort by CMC' },
      { value: Sort.type.byName,  text: 'Sort by Name' },
      { value: Sort.type.byType,  text: 'Sort by Type' },
      { value: Sort.type.byColor, text: 'Sort by Color' }
    ];

    var orderOptions = [
      { value: Sort.order.ASC, text: 'Ascending' },
      { value: Sort.order.DESC, text: 'Descending' }
    ];

    return {
      sort: sortOptions,
      order: orderOptions
    }
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

  _byKey(list, key, order, grouped) {
    var sorted  = list.sort(Sort._keyCompare.bind(this, key));

    if (grouped != false) {
      sorted = Sort._groupBy(sorted, key);
    }

    return (!order || order == Sort.order.ASC) ? sorted : sorted.reverse()
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
      result.push(
        Sort._byKey(groups[key], 'name', Sort.order.ASC, false)
      );
    });

    return result;
  }
}

module.exports = Sort;
