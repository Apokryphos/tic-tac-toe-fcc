const React = require('react');
const Board = require('./components/board.jsx');
const CellState = require('./../tic-tac-toe/cell-state.js');
const Game = require('./../tic-tac-toe/game.js');
const PlayerSelect = require('./components/player-select.jsx');
const Title = require('./components/title.jsx');
const VictoryState = require('./../tic-tac-toe/victory-state.js');

const AI_MOVE_DELAY = 600;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayerSelect = this.handlePlayerSelect.bind(this);
    this.handleReset = this.handleReset.bind(this);

    this.state = {
      //  IE doesn't support Array fill method
      cells: [null, null, null, null, null, null, null, null, null],
      game: null
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.game) {
      const player = this.state.game.getActivePlayer();

      if (player.aiEnabled) {
        const victoryState = this.state.game.board.getVictoryState();

        if (victoryState === VictoryState.NONE) {
          const move = () => {
            this.state.game.aiMove();
            this.setState({
              cells: this.state.game.board.cells.slice()
            });
          };

          setTimeout(move, AI_MOVE_DELAY);
        }
      }
    }
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
    return (
      <Board
        activePlayer={this.state.game.getActivePlayer()}
        cells={this.state.cells}
        onCellClick={index => this.handleCellClick(index)}
      />
    );
  }

  renderMenu() {
    let text = null;
    let resetButton = null;
    const victoryState = this.state.game.board.getVictoryState();
    switch (victoryState) {
      case VictoryState.NONE:
        const player = this.state.game.getActivePlayer();
        text = `${CellState.toString(player.cellState)}'s turn.`;
        break;
      case VictoryState.X:
        text = 'X Won!';
        resetButton = this.renderResetButton();
        break;
      case VictoryState.O:
        text = 'O Won!';
        resetButton = this.renderResetButton();
        break;
      case VictoryState.DRAW:
        text = "It's a draw!";
        resetButton = this.renderResetButton();
        break;
    }

    return (
      <div>
        <h1 className="status-text">{text}</h1>
        {resetButton}
      </div>
    );
  }

  renderResetButton() {
    return (
      <button className="reset-button" onClick={this.handleReset}>
        Play again?
      </button>
    );
  }

  render() {
    let gameArea = null;
    let menuArea = null;

    if (this.state.game) {
      gameArea = this.renderBoard();
      menuArea = this.renderMenu();
    } else {
      gameArea = <PlayerSelect onClick={this.handlePlayerSelect} />;
    }

    return (
      <div>
        <Title />
        <div className="game-container">{gameArea}</div>
        <div className="menu-container">{menuArea}</div>
      </div>
    );
  }
}

module.exports = App;
