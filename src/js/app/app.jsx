const React = require('react');
const Board = require('./components/board.jsx');
const CellState = require('./../tic-tac-toe/cell-state.js');
const Game = require('./../tic-tac-toe/game.js');
const VictoryState = require('./../tic-tac-toe/victory-state.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.game = new Game();

    this.state = {
      cells: Array(9).fill(null)
    };
  }

  handleCellClick(index) {
    const player = this.game.getActivePlayer();
    if (!player.aiEnabled) {
      this.game.move(player, index);
    } else {
      this.game.move(player, index);
    }

    this.setState({
      cells: this.game.board.cells.slice()
    });
  }

  render() {
    let text = null;

    const victoryState = this.game.board.getVictoryState();
    switch (victoryState) {
      case VictoryState.NONE:
        const player = this.game.getActivePlayer();
        text = `${CellState.toString(player.cellState)}'s turn`;
        break;
      case VictoryState.X:
        text = 'X Won.';
        break;
      case VictoryState.O:
        text = 'O Won.';
        break;
      case VictoryState.DRAW:
        text = 'Draw.';
        break;
    }

    return (
      <div className="board-container">
        <Board
          cells={this.state.cells}
          onCellClick={(index) => this.handleCellClick(index)}
        />
        <h1>{text}</h1>
      </div>
    );
  }
}

module.exports = App;
