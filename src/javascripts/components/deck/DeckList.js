var _           = require('util');
var React       = require('react/addons');
var Reflux      = require('reflux');
var CardList    = require('components/card/CardList');
var SelectInput = require('components/ui/SelectInput');
var DeckActions = require('actions/DeckActions');
var DeckStore   = require('stores/DeckStore');
var CardStore   = require('stores/CardStore');
var Sort        = require('lib/Sort');

var Pure        = React.addons.PureRenderMixin;
var Types       = React.PropTypes;

var DeckList = React.createClass({

  mixins: [Pure, Reflux.listenTo(DeckStore, '_onDeckChange')],

  propTypes: {
    id: Types.number.isRequired
  },

  getDefaultProps() {
    return {
      sort: Sort.byCmc,
      order: Sort.types.ASC
    }
  },

  getInitialState() {
    return {
      syncing: false,
      deck: null,
      sort: this.props.sort,
      order: this.props.order,
      sortKey: 'byCmc',
      orderKey: 'ASC'
    }
  },

  componentWillMount() {
    this.setState({ syncing: true });
    DeckActions.get(this.props.id);
  },

  _onDeckChange(deck) {
    this.setState({ syncing: false, deck })
  },

  _onSortChange(e) {
    this.setState({
      sort: Sort[e.target.value] || this.props.sort,
      sortKey: e.target.value
    })
  },

  _onOrderChange(e) {
    this.setState({
      order: Sort.types[e.target.value] || this.props.order,
      orderKey: e.target.value
    })
  },

  render() {
    var cardLists = [];

    var createCardLists = function(cards, i) {
      return (
        <li className="DeckList-Item" key={ i } >
          <CardList cards={ cards } />
        </li>
      );
    };

    if (this.state.deck) {
      var { deck, sort, order, sortKey, orderKey } = this.state;

      var sorted    = sort(deck.mainDeck, order);
      var cardLists = sorted.map(createCardLists);
    }

    var sortOptions = [
      { value: 'byName', text: 'Sort by Name' },
      { value: 'byCmc', text: 'Sort by CMC' },
      { value: 'byType', text: 'Sort by Type' },
      { value: 'byColor', text: 'Sort by Color' }
    ]

    var orderOptions = [
      { value: 'ASC', text: 'Ascending' },
      { value: 'DESC', text: 'Descending' }
    ]

    return (
      <div>
        <SelectInput
          onChange={ this._onSortChange }
          allowBlank={ false }
          options={ sortOptions }
          value={ sortKey } />

        <SelectInput
          onChange={ this._onOrderChange }
          allowBlank={ false }
          options={ orderOptions }
          value={ orderKey } />

        <ul className="DeckList">
          { cardLists }
        </ul>
      </div>
    )
  }
});

module.exports = DeckList;
