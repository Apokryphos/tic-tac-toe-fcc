const React = require('react');
const CellState = require('./../../tic-tac-toe/cell-state.js');

class Square extends React.Component {
  render() {
    let text = null;
    switch (this.props.cellState) {
      case CellState.X:
        text = 'X';
        break;
      case CellState.O:
        text = 'O';
        break;
    }

    text = 'X';

    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {text}
      </button>
    );
  }
}

module.exports = Square;
