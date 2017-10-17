const test = require('tape');
const Ai = require('./../src/js/tic-tac-toe/ai.js');
const Game = require('./../src/js/tic-tac-toe/game.js');
const CellState = require('./../src/js/tic-tac-toe/cell-state.js');
const Player = require('./../src/js/tic-tac-toe/player.js');
const Util = require('./../src/js/tic-tac-toe/util.js');
const VictoryState = require('./../src/js/tic-tac-toe/victory-state.js');

test('Ai first move', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.X);

  const move = ai.getMove(game);
  for (let c = 0; c < 100; ++c) {
    t.equal(move >= 0 && move < game.board.cells.length, true);
  }

  t.end();
});

test('Ai picks winning move', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.X);

  game.board.setCell(0, 0, CellState.O);
  game.board.setCell(2, 0, CellState.X);
  game.board.setCell(0, 1, CellState.X);
  game.board.setCell(2, 1, CellState.X);
  game.board.setCell(1, 2, CellState.O);
  game.board.setCell(2, 2, CellState.O);
  t.equal(ai.getMove(game), 4);

  t.end();
});

test('One AI player will always win or draw', (t) => {
  const game = new Game();

  const player1 = new Player(CellState.X);
  const player2 = new Ai(CellState.O);

  for (let c = 0; c < 100; ++c) {
    let player = player1;
    while (game.board.getVictoryState() === VictoryState.NONE) {
      const move =
        typeof player === 'Ai' ?
        player.getMove(game) :
        Util.randomElement(game.board.getEmptyCellIndices());

      game.board.setCellByIndex(move, player.cellState);

      player = (player === player1) ? player2 : player1;
    }

    const victoryState = game.board.getVictoryState();
    t.equal(
      victoryState === VictoryState.X ||
      victoryState === VictoryState.O ||
      victoryState === VictoryState.DRAW,
      true);
  }

  t.end();
});

test('Two AI players will draw', (t) => {
  const game = new Game();

  const player1 = new Ai(CellState.X);
  const player2 = new Ai(CellState.O);

  for (let c = 0; c < 100; ++c) {
    let player = player1;
    while (game.board.getVictoryState() === VictoryState.NONE) {
      const move = player.getMove(game);
      game.board.setCellByIndex(move, player.cellState);
      player = (player === player1) ? player2 : player1;
    }

    t.equal(game.board.getVictoryState(), VictoryState.DRAW);
  }

  t.end();
});

test('Ai picks winning move', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.O);

  game.board.setCell(2, 0, CellState.X);
  game.board.setCell(0, 1, CellState.X);
  game.board.setCell(2, 1, CellState.X);
  game.board.setCell(1, 2, CellState.O);
  game.board.setCell(2, 2, CellState.O);
  t.equal(ai.getMove(game), 6);

  t.end();
});

test('Ai picks winning move', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.X);

  game.board.setCell(0, 0, CellState.O);
  game.board.setCell(2, 2, CellState.O);
  t.equal(ai.getMove(game), 4);

  t.end();
});

test('Ai picks winning move', (t) => {
  const game = new Game();
  const ai = new Ai(CellState.X);

  game.board.setCell(0, 0, CellState.X);
  game.board.setCell(2, 2, CellState.X);
  t.equal(ai.getMove(game), 4);

  t.end();
});
