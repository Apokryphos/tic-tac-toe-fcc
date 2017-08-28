const test = require('tape');
const CellState = require('./../tic-tac-toe/cell-state.js');

test('CellState getOpponent', (t) => {
  t.plan(3);
  t.equal(CellState.getOpponent(CellState.X), CellState.O);
  t.equal(CellState.getOpponent(CellState.O), CellState.X);
  t.throws(() => CellState.getOpponent(CellState.EMPTY));
});
