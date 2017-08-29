const test = require('tape');
const Game = require('./../tic-tac-toe/game.js');
const CellState = require('./../tic-tac-toe/cell-state.js');

test('Game constructor', (t) => {
  const game = new Game();

  t.equal(game.board.size, 3);
  t.equal(game.players[0].cellState, CellState.X);
  t.equal(game.players[0].aiEnabled, false);
  t.equal(game.players[1].cellState, CellState.O);
  t.equal(game.players[1].aiEnabled, true);
  t.equal(game.getActivePlayer(), game.players[0]);

  t.end();
});

test('Game alternates between players after move', (t) => {
  const game = new Game();

  t.equal(game.players[0].aiEnabled, false);
  t.equal(game.players[1].aiEnabled, true);
  t.equal(game.getActivePlayer(), game.players[0]);

  //  All cells are empty
  t.equal(game.board.getEmptyCellIndices().length, 9);

  //  Player moves. AI moves immediately after.
  game.move(game.players[0], 0);

  //  Two cells are no longer empty.
  t.equal(game.board.getEmptyCellIndices().length, 7);

  //  First player is active again
  t.equal(game.getActivePlayer(), game.players[0]);

  t.end();
});
