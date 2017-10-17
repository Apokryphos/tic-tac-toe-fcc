const React = require('react');
const Cell = require('./cell.jsx');
const CellState = require('./../../tic-tac-toe/cell-state.js');
const Game = require('./../../tic-tac-toe/game.js');

class Board extends React.Component {
  handleClick(index) {
    this.props.onCellClick(index);
  }

  renderCell(index) {
    return (
      <Cell
        cellState={this.props.cells[index]}
        onClick={() => this.handleClick(index)}
      />
    );
  }

  render() {
    return (
      <div className="board">
        <div>
          <div className="board-row">
            {this.renderCell(0)}
            {this.renderCell(1)}
            {this.renderCell(2)}
          </div>
          <div className="board-row">
            {this.renderCell(3)}
            {this.renderCell(4)}
            {this.renderCell(5)}
          </div>
          <div className="board-row">
            {this.renderCell(6)}
            {this.renderCell(7)}
            {this.renderCell(8)}
          </div>
        </div>
      </div>
    );
  }
}

module.exports = Board;
