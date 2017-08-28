const test = require('tape');
const CellState = require('./../tic-tac-toe/cell-state.js');
const GameBoard = require('./../tic-tac-toe/game-board.js');

test('Board constructor', (t) => {
  const board = new GameBoard();

  for (let y = 0; y < board.size; ++y) {
    for (let x = 0; x < board.size; ++x) {
      t.equal(board.getCell(x, y), CellState.EMPTY);
    }
  }

  t.end();
});

test('Board cell get and set', (t) => {
  const board = new GameBoard();

  board.setCell(0, 0, CellState.X);
  t.equal(board.getCell(0, 0), CellState.X);
  t.equal(board.getCellByIndex(0), CellState.X);

  board.setCell(0, 1, CellState.O);
  t.equal(board.getCell(0, 1), CellState.O);
  t.equal(board.getCellByIndex(3), CellState.O);

  board.setCell(1, 1, CellState.O);
  t.equal(board.getCell(1, 1), CellState.O);
  t.equal(board.getCellByIndex(4), CellState.O);

  t.end();
});
