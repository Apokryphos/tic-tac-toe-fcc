const test = require('tape');
const CellState = require('./../tic-tac-toe/cell-state.js');
const Player = require('./../tic-tac-toe/player.js');

test('Player constructor', (t) => {
  t.plan(7);

  t.doesNotThrow(() => new Player(CellState.X));
  t.doesNotThrow(() => new Player(CellState.O));
  t.throws(() => new Player(CellState.EMPTY));
  t.throws(() => new Player('X'));

  t.doesNotThrow(() => new Player(CellState.X, true));
  t.doesNotThrow(() => new Player(CellState.O, false));
  t.throws(() => new Player(CellState.X, 'no'));
});
