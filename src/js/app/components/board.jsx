const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');
const Square = require('./square.jsx');

class Board extends React.Component {
  renderSquare(index) {
    return (
      <Square
        cellState={CellState.EMPTY}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  render() {
    const squares = this.renderSquare(CellState.X);

    return (
      <div>
        {this.renderSquare(0)}
        {this.renderSquare(1)}
        {this.renderSquare(2)}
      </div>
    );
  }
}

module.exports = Board;
