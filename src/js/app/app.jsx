const React = require('react');
const Board = require('./components/board.jsx');
const CellState = require('./../tic-tac-toe/cell-state.js');
const Game = require('./../tic-tac-toe/game.js');
const PlayerSelect = require('./components/player-select.jsx');
const VictoryState = require('./../tic-tac-toe/victory-state.js');

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      cells: Array(9).fill(null),
      game: null
    };
  }

  handleCellClick(index) {
    const victoryState = this.state.game.board.getVictoryState();
    if (victoryState === VictoryState.NONE) {
      const player = this.state.game.getActivePlayer();
      if (!player.aiEnabled) {
        this.state.game.move(player, index);
      }

      this.setState({
        cells: this.state.game.board.cells.slice()
      });
    }
  }

  handlePlayerSelect(cellState) {
    const game = new Game(cellState);

    this.setState({
      cells: game.board.cells.slice(),
      game: game
    });
  }

  handleReset() {
    this.setState({
      cells: null,
      game: null
    });
  }

  renderBoard() {
    let textClass = null;
    let text = null;
    let resetButton = null;
    const victoryState = this.state.game.board.getVictoryState();
    switch (victoryState) {
      case VictoryState.NONE:
        const player = this.state.game.getActivePlayer();
        text = `${CellState.toString(player.cellState)}'s turn`;
        textClass = player.cellState === CellState.X ? 'player-x' : 'player-o';
        break;
      case VictoryState.X:
        text = 'X Won.';
        textClass = 'player-x';
        resetButton = this.renderResetButton();
        break;
      case VictoryState.O:
        text = 'O Won.';
        textClass = 'player-o';
        resetButton = this.renderResetButton();
        break;
      case VictoryState.DRAW:
        text = 'Draw.';
        textClass = 'draw';
        resetButton = this.renderResetButton();
        break;
    }

    return (
      <div className="board-container">
        <Board
          activePlayer={this.state.game.getActivePlayer()}
          cells={this.state.cells}
          onCellClick={index => this.handleCellClick(index)}
        />
        <h1 className={textClass}>{text}</h1>
        {resetButton}
      </div>
    );
  }

  renderPlayerSelect() {
    return <PlayerSelect onClick={this.handlePlayerSelect} />;
  }

  renderResetButton() {
    return (<button className="reset-button" onClick={this.handleReset}>Play again?</button>);
  }

  render() {
    if (this.state.game) {
      return this.renderBoard();
    } else {
      return this.renderPlayerSelect();
    }
  }
}

module.exports = App;
