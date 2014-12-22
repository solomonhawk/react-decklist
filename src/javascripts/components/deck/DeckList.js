var _              = require('util');
var Sort           = require('lib/Sort');
var React          = require('react/addons');
var Reflux         = require('reflux');
var SelectInput    = require('components/ui/SelectInput');
var RangeInput     = require('components/ui/RangeInput');
var ResizablePanel = require('components/ui/ResizablePanel');
var CardList       = require('components/card/CardList');
var DeckActions    = require('actions/DeckActions');
var DeckStore      = require('stores/DeckStore');

var Pure        = React.addons.PureRenderMixin;
var Types       = React.PropTypes;

var sortOptions  = Sort.getSortOptions().sort;
var orderOptions = Sort.getSortOptions().order;

var DeckList = React.createClass({

  mixins: [Pure, Reflux.listenTo(DeckStore, '_onDeckChange')],

  propTypes: {
    id: Types.number.isRequired
  },

  getDefaultProps() {
    return {
      sort  : Sort.type.byCmc,
      order : Sort.order.ASC
    }
  },

  getInitialState() {
    return {
      syncing    : false,
      deck       : null,
      columnWidth: 150,
      mainBoard  : [],
      sideBoard  : [],
      maybeBoard : [],
      sort       : this.props.sort,
      order      : this.props.order
    }
  },

  componentWillMount() {
    this.setState({ syncing: true });
    DeckActions.get(this.props.id);
  },

  _onDeckChange(deck) {
    this.setState({
      syncing    : false,
      deck       : deck,
      mainBoard  : deck.mainBoard,
      sideBoard  : deck.sideBoard,
      maybeBoard : deck.maybeBoard
    });
  },

  _onSortChange(e) {
    this.setState({
      sort: Sort.type[e.target.value]
    });
  },

  _onOrderChange(e) {
    this.setState({
      order: Sort.order[e.target.value]
    });
  },

  _onScaleChange(e) {
    this.setState({
      columnWidth: e.target.value
    });
  },

  render() {
    var deckLists = [];

    var createCardLists;
    var createDeckList;

    if (this.state.deck) {
      var { mainBoard, sideBoard, maybeBoard, columnWidth, scale, sort, order } = this.state;

      createCardLists = function(cards, i) {
        if (!cards.length) return;

        return (
          <li className="DeckList-Item" style={{ width: columnWidth }} key={ i } >
            <CardList cards={ cards } />
          </li>
        );
      };

      createDeckList = function(list, i) {
        if (!list.length) return;

        return (
          <div className="DeckList-wrapper" key={ i }>
            <ul className="DeckList">
              { list }
            </ul>
          </div>
        );
      }

      deckLists = [
        Sort[sort](mainBoard, order).map(createCardLists),
        Sort[sort](sideBoard, order).map(createCardLists),
        Sort[sort](maybeBoard, order).map(createCardLists)
      ].map(createDeckList).filter(function(l) { return l != undefined; });
    }

    return (
      <div className="DeckLists">
        <div className="DeckControls">
          <RangeInput  onChange={ this._onScaleChange } value={ columnWidth }    step={ 1 } from={ 150 } to={ 275 } />
          <SelectInput onChange={ this._onSortChange }  options={ sortOptions }  value={ sort }  allowBlank={ false } />
          <SelectInput onChange={ this._onOrderChange } options={ orderOptions } value={ order } allowBlank={ false } />
        </div>

        <ResizablePanel panels={ deckLists.length }>
          { deckLists }
        </ResizablePanel>
      </div>
    )
  }
});

module.exports = DeckList;
