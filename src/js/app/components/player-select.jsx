const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');

class PlayerSelect extends React.Component {
  handleClick(cellState) {
    if (this.props.onClick) {
      this.props.onClick(cellState);
    }
  }

  render() {
    return (
      <div className="player-select">
        <h1>Select Player</h1>
        <button
          className="cell-x active-player-x"
          onClick={() => this.handleClick(CellState.X)}
        >
          X
        </button>
        <button
          className="cell-o active-player-o"
          onClick={() => this.handleClick(CellState.O)}
        >
          O
        </button>
      </div>
    );
  }
}

module.exports = PlayerSelect;
