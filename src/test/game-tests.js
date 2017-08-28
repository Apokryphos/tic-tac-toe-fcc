const test = require('tape');
const Game = require('./../tic-tac-toe/game.js');
const CellState = require('./../tic-tac-toe/cell-state.js');

test('Game constructor', (t) => {
  const game = new Game();

  t.equal(game.board.size, 3);

  t.end();
});

test('Game win patterns', (t) => {
  const game = new Game();

  t.equal(game.getWinner(), CellState.EMPTY);

  game.board.setCell(0, 0, CellState.X);
  game.board.setCell(1, 0, CellState.X);
  game.board.setCell(2, 0, CellState.X);
  t.equal(game.getWinner(), CellState.X);
  game.board.clear();

  game.board.setCell(0, 1, CellState.O);
  game.board.setCell(1, 1, CellState.O);
  game.board.setCell(2, 1, CellState.O);
  t.equal(game.getWinner(), CellState.O);
  game.board.clear();

  t.end();
});
