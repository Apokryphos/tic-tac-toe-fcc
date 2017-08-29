const CellState = require('./cell-state.js');
const VictoryState = require('./../tic-tac-toe/victory-state.js');

//  Board indices for wins
//  0 1 2
//  3 4 5
//  6 7 8
const winPatterns = [
  [ 0, 1, 2 ],
  [ 3, 4, 5 ],
  [ 6, 7, 8 ],
  [ 0, 3, 6 ],
  [ 1, 4, 7 ],
  [ 2, 5, 8 ],
  [ 0, 4, 8 ],
  [ 2, 4, 6 ],
];

function GameBoard(board) {
  this.cells = [];
  this.size = 3;

  const createCell = board ?
    (c) => board.cells[c] :
    (c) => CellState.EMPTY;

  for (let c = 0; c < this.size * this.size; ++c) {
    this.cells.push(createCell(c));
  }
}

GameBoard.prototype.clear = function() {
  for (let c = 0; c < this.size * this.size; ++c) {
    this.cells[c] = CellState.EMPTY;
  }
};

GameBoard.prototype.getCell = function(x, y) {
  if (!this.inBounds(x ,y)) {
    throw new Error('Specified coordinates are out of bounds.');
  }

  const index = y * this.size + x;
  return this.cells[index];
};

GameBoard.prototype.getCellByIndex = function(index) {
  if (index < 0 || index >= this.size * this.size) {
    throw new Error('Specified index is out of bounds.');
  }

  return this.cells[index];
};

GameBoard.prototype.getEmptyCellIndices = function() {
  const emptyCells = [];
  for (let c = 0; c < this.cells.length; ++c) {
    if (this.cells[c] === CellState.EMPTY) {
      emptyCells.push(c);
    }
  }
  return emptyCells;
}

GameBoard.prototype.getVictoryState = function() {
  const patternMatches = (pattern, cellState) => {
    for (let c = 0; c < pattern.length; ++c) {
      const cell = this.getCellByIndex(pattern[c]);

      if (cell !== cellState) {
        return false;
      }
    }

    return true;
  };

  for (let p = 0; p < winPatterns.length; ++p) {
    const pattern = winPatterns[p];

    if (patternMatches(pattern, CellState.X)) {
      return VictoryState.X;
    } else if (patternMatches(pattern, CellState.O)) {
      return VictoryState.O;
    }
  }

  if (this.getEmptyCellIndices().length === 0) {
    return VictoryState.DRAW;
  }

  return VictoryState.NONE;
}

GameBoard.prototype.inBounds = function(x, y) {
  const cellCount = this.size * this.size;
  return (x >= 0 && y >= 0 && x < cellCount && y < cellCount);
};

GameBoard.prototype.setCell = function(x, y, cellState) {
  if (!this.inBounds(x ,y)) {
    throw new Error('Specified coordinates are out of bounds.');
  }

  const index = y * this.size + x;
  this.cells[index] = cellState;
};

GameBoard.prototype.setCellByIndex = function(index, cellState) {
  if (index < 0 || index >= this.size * this.size) {
    throw new Error('Specified index is out of bounds.');
  }

  this.cells[index] = cellState;
};

module.exports = GameBoard;
