const GameBoard = require('./game-board.js');
const CellState = require('./cell-state.js');
const Util = require('./util.js');
const VictoryState = require('./victory-state.js');

const SCORE_BASE = 10;

function getScore(victoryState, player, depth) {
  if (victoryState === VictoryState.NONE) {
    return 0;
  } else if (victoryState === VictoryState.DRAW) {
    return 0;
  } else {
    //  Return score from view of player
    return VictoryState.getCellState(victoryState) === player
      ? SCORE_BASE - depth
      : depth - SCORE_BASE;
  }
}

function Ai(cellState) {
  this.cellState = cellState;
}

Ai.prototype.canMove = function(game) {
  const emptyCells = game.board.getEmptyCellIndices();
  return emptyCells.length > 0;
};

Ai.prototype.getMove = function(game) {
  //  This shouldn't be called if there are no empty cells
  if (!this.canMove(game)) {
    throw new Error('Game is a draw. No moves available.');
  }

  const emptyCells = game.board.getEmptyCellIndices();

  //  First move? Pick random cell for now...
  if (emptyCells.length === game.board.cells.length) {
    return Util.randomElement(emptyCells);
  }

  this.bestMove = null;

  this.minMax(game.board, this.cellState, this.cellState, 0);

  return this.bestMove;
};

Ai.prototype.minMax = function(board, player, turn, depth) {
  //  Return score if there is a winner
  const victoryState = board.getVictoryState();
  if (victoryState !== VictoryState.NONE) {
    return getScore(victoryState, player, depth);
  }

  //  Create a move for each empty cell
  const moves = board.getEmptyCellIndices();

  //  Calculate the score for each move
  const scores = moves.map(cellIndex => {
    //  Create a new board to represent this possible state
    const moveBoard = new GameBoard(board);

    //  Make the actual move in this state
    moveBoard.setCellByIndex(cellIndex, turn);

    //  Determine if there was a winner in this state
    return this.minMax(
      moveBoard,
      player,
      CellState.getOpponent(turn),
      depth + 1
    );
  });

  let score = 0;
  if (turn === player) {
    score = Math.max(...scores);
  } else {
    score = Math.min(...scores);
  }

  const scoreIndex = scores.indexOf(score);
  this.bestMove = moves[scoreIndex];

  return score;
};

module.exports = Ai;
