const CellState = require('./cell-state.js')
const GameBoard = require('./game-board.js')
const Player = require('./player.js')

function Game() {
  this.board = new GameBoard();
  this.players = [
    new Player(CellState.X),
    new Player(CellState.O),
  ];

  this.activePlayerIndex = 0;

  //  Board indices for wins
  //  0 1 2
  //  3 4 5
  //  6 7 8
  this.winPatterns = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
  ];
}

Game.prototype.getActivePlayer = function() {
  return this.players[this.activePlayerIndex];
}

Game.prototype.getWinner = function() {
  const patternMatches = (pattern, cellState) => {
    for (let c = 0; c < pattern.length; ++c) {
      const cell = this.board.getCellByIndex(pattern[c]);

      if (cell !== cellState) {
        return false;
      }
    }

    return true;
  };

  for (let p = 0; p < this.winPatterns.length; ++p) {
    const pattern = this.winPatterns[p];

    if (patternMatches(pattern, CellState.X)) {
      return CellState.X;
    } else if (patternMatches(pattern, CellState.O)) {
      return CellState.O;
    }
  }

  return CellState.EMPTY;
}

module.exports = Game;
