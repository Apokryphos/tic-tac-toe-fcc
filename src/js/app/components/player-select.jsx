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
        <h2>Select Player</h2>
        <button onClick={() => this.handleClick(CellState.X)}>
          X
        </button>
        <button onClick={() => this.handleClick(CellState.O)}>
          <span>O</span>
        </button>
      </div>
    );
  }
}

module.exports = PlayerSelect;
