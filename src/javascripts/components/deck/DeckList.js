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
      sort: Sort.type.byCmc,
      order: Sort.order.ASC
    }
  },

  getInitialState() {
    return {
      deck    : null,
      syncing : false,
      sort    : this.props.sort,
      order   : this.props.order
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
      sort: Sort.type[e.target.value || this.props.sort]
    })
  },

  _onOrderChange(e) {
    this.setState({
      order: Sort.order[e.target.value || this.props.order]
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
      var { deck, sort, order } = this.state;

      console.log(sort, order);

      var sorted    = Sort[sort](deck.mainDeck, order);
      var cardLists = sorted.map(createCardLists);
    }

    return (
      <div>
        <SelectInput
          allowBlank={ false }
          onChange={ this._onSortChange }
          options={ Sort.getSortOptions().sort }
          value={ sort } />

        <SelectInput
          allowBlank={ false }
          onChange={ this._onOrderChange }
          options={ Sort.getSortOptions().order }
          value={ order } />

        <ul className="DeckList">
          { cardLists }
        </ul>
      </div>
    )
  }
});

module.exports = DeckList;
