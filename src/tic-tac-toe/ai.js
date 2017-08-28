const GameBoard = require('./game-board.js');
const CellState = require('./cell-state.js');

function Ai(cellState) {
  this.cellState = cellState;
}

Ai.prototype.getMove = function(game) {
  const movesBoard = new GameBoard();
  const opponent = CellState.getOpponent(this.cellState);

  const emptyCells = [];
  for (let c = 0; c < game.board.cells.length; ++c) {
    if (game.board.cells[c] === CellState.EMPTY) {
      emptyCells.push(c);
    }
  }

  //  First move? Pick center for now...
  if (emptyCells.length === game.board.cells.length) {
    return 4;
  }
}

module.exports = Ai;
