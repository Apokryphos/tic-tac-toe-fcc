const CellState = require('./cell-state.js');

function GameBoard() {
  this.cells = [];
  this.size = 3;

  for (let c = 0; c < this.size * this.size; ++c) {
    this.cells.push(CellState.EMPTY);
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

module.exports = GameBoard;
