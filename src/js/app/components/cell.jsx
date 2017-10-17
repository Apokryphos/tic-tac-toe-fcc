const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');

class Cell extends React.Component {
  render() {
    let text = null;
    switch (this.props.cellState) {
      case CellState.X:
        text = <span className="cell-x">X</span>;
        break;
      case CellState.O:
        text = <span className="cell-o">O</span>;
        break;
    }

    return (
      <button className="cell" onClick={() => this.props.onClick()}>
        {text}
      </button>
    );
  }
}

module.exports = Cell;
