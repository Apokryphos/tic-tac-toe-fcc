const test = require('tape');
const CellState = require('./../tic-tac-toe/cell-state.js');
const GameBoard = require('./../tic-tac-toe/game-board.js');
const VictoryState = require('./../tic-tac-toe/victory-state.js');

test('Board constructor', (t) => {
  const board = new GameBoard();

  for (let y = 0; y < board.size; ++y) {
    for (let x = 0; x < board.size; ++x) {
      t.equal(board.getCell(x, y), CellState.EMPTY);
    }
  }

  t.end();
});

test('Board constructor with existing board', (t) => {
  const board = new GameBoard();

  board.setCell(0, 0, CellState.X);
  board.setCell(1, 0, CellState.O);
  board.setCell(3, 0, CellState.X);

  const board2 = new GameBoard(board);

  for (let y = 0; y < board.size; ++y) {
    for (let x = 0; x < board.size; ++x) {
      t.equal(board.getCell(x, y), board2.getCell(x, y));
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

  board.setCellByIndex(8, CellState.X);
  t.equal(board.getCell(2, 2), CellState.X);
  t.equal(board.getCellByIndex(8), CellState.X);

  t.end();
});

test('Board getEmptyCellIndices', (t) => {
  const board = new GameBoard();

  t.deepEqual(board.getEmptyCellIndices(), [ 0, 1, 2, 3, 4, 5, 6, 7, 8 ]);

  board.setCell(0, 0, CellState.X);
  board.setCell(1, 1, CellState.O);
  board.setCell(2, 2, CellState.O);

  t.deepEqual(board.getEmptyCellIndices(), [ 1, 2, 3, 5, 6, 7 ]);

  t.end();
});

test('Board victory states', (t) => {
  const board = new GameBoard();

  t.equal(board.getVictoryState(), VictoryState.NONE);

  board.setCell(0, 0, CellState.X);
  board.setCell(1, 0, CellState.X);
  board.setCell(2, 0, CellState.X);
  t.equal(board.getVictoryState(), VictoryState.X);
  board.clear();

  board.setCell(0, 1, CellState.O);
  board.setCell(1, 1, CellState.O);
  board.setCell(2, 1, CellState.O);
  t.equal(board.getVictoryState(), VictoryState.O);
  board.clear();

  board.setCell(0, 0, CellState.X);
  board.setCell(1, 0, CellState.O);
  board.setCell(2, 0, CellState.X);
  board.setCell(0, 1, CellState.X);
  board.setCell(1, 1, CellState.O);
  board.setCell(2, 1, CellState.X);
  board.setCell(0, 2, CellState.O);
  board.setCell(1, 2, CellState.X);
  board.setCell(2, 2, CellState.O);
  t.equal(board.getVictoryState(), VictoryState.DRAW);

  t.end();
});
