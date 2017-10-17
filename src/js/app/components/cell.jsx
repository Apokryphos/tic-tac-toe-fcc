const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');

class Cell extends React.Component {
  render() {
    let cellClass = 'cell';
    let text = null;
    switch (this.props.cellState) {
      case CellState.X:
        cellClass = 'cell cell-x';
        text = 'X';
        break;
      case CellState.O:
        cellClass = 'cell cell-o';
        text = 'O';
        break;
      default:
        {
          switch (this.props.activePlayer.cellState) {
            case CellState.X:
              cellClass = 'cell active-player-x';
              break;
            case CellState.O:
              cellClass = 'cell active-player-o';
              break;
          }
        }
        break;
    }

    return (
      <button className={cellClass} onClick={() => this.props.onClick()}>
        <span className="cell-text">{text}</span>
      </button>
    );
  }
}

module.exports = Cell;
