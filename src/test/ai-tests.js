const test = require('tape');
const Ai = require('./../tic-tac-toe/ai.js');
const Game = require('./../tic-tac-toe/game.js');
const CellState = require('./../tic-tac-toe/cell-state.js');

test('Ai', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.X);

  t.equal(ai.getMove(game), 4);

  // game.board.setCell(0, 0, CellState.X);
  // game.board.setCell(2, 0, CellState.X);
  // t.equal(ai.getMove(game), 1);

  t.end();
});
