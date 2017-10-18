const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');

class Cell extends React.Component {
  render() {
    let cellClass = 'cell';
    let cellTextClass = 'cell-text';
    let text = null;
    switch (this.props.cellState) {
      case CellState.X:
        cellClass += ' cell-occupied';
        cellTextClass += ' cell-occupied';
        text = 'X';
        break;
      case CellState.O:
        cellClass += ' cell-occupied';
        cellTextClass += ' cell-occupied';
        text = 'O';
        break;
    }

    return (
      <button className={cellClass} onClick={() => this.props.onClick()}>
        <span className={cellTextClass}>{text}</span>
      </button>
    );
  }
}

module.exports = Cell;
