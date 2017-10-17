const test = require('tape');
const Game = require('./../src/js/tic-tac-toe/game.js');
const CellState = require('./../src/js/tic-tac-toe/cell-state.js');

test('Game constructor', t => {
  const game = new Game();

  t.equal(game.board.size, 3);
  t.equal(game.players[0].cellState, CellState.X);
  t.equal(game.players[0].aiEnabled, false);
  t.equal(game.players[1].cellState, CellState.O);
  t.equal(game.players[1].aiEnabled, true);
  t.equal(game.getActivePlayer(), game.players[0]);

  t.end();
});

test('Game alternates between players after move (local player is X)', t => {
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

test('Game alternates between players after move (local player is O)', t => {
  const game = new Game(CellState.O);

  t.equal(game.players[0].aiEnabled, true);
  t.equal(game.players[1].aiEnabled, false);

  //  AI moved immediately so second player should be active
  t.equal(game.getActivePlayer(), game.players[1]);

  //  One cell is no longer empty
  t.equal(game.board.getEmptyCellIndices().length, 8);

  //  Player moves. AI moves immediately after.
  const cellIndex = game.board.getEmptyCellIndices()[0];
  game.move(game.players[1], cellIndex);

  //  Three cells are no longer empty.
  t.equal(game.board.getEmptyCellIndices().length, 6);

  //  O player is active again
  t.equal(game.getActivePlayer(), game.players[1]);

  t.end();
});
