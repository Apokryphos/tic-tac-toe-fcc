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
    const victoryState = this.game.board.getVictoryState();
    if (victoryState === VictoryState.NONE) {
      const player = this.game.getActivePlayer();
      if (!player.aiEnabled) {
        this.game.move(player, index);
      }

      this.setState({
        cells: this.game.board.cells.slice()
      });
    }
  }

  render() {
    let textClass = null;
    let text = null;
    const victoryState = this.game.board.getVictoryState();
    switch (victoryState) {
      case VictoryState.NONE:
        const player = this.game.getActivePlayer();
        text = `${CellState.toString(player.cellState)}'s turn`;
        textClass = player.cellState === CellState.X ? 'player-x' : 'player-o';
        break;
      case VictoryState.X:
        text = 'X Won.';
        textClass = 'player-x';
        break;
      case VictoryState.O:
        text = 'O Won.';
        textClass = 'player-o';
        break;
      case VictoryState.DRAW:
        text = 'Draw.';
        textClass = 'draw';
        break;
    }

    return (
      <div className="board-container">
        <Board
          activePlayer={this.game.getActivePlayer()}
          cells={this.state.cells}
          onCellClick={(index) => this.handleCellClick(index)}
        />
        <h1 className={textClass}>{text}</h1>
      </div>
    );
  }
}

module.exports = App;
