const CellState = require('./cell-state.js')
const GameBoard = require('./game-board.js')
const Player = require('./player.js')

function Game() {
  this.board = new GameBoard();
  this.players = [
    new Player(CellState.X),
    new Player(CellState.O, true),
  ];

  this.activePlayerIndex = 0;
}

Game.prototype.aiMove = function(cellIndex) {
  if (this.getActivePlayer().aiEnabled) {
    const cellIndex = this.getActivePlayer().ai.getMove(this);
    if (this.board.getCellByIndex(cellIndex) === CellState.EMPTY) {
      this.board.setCellByIndex(cellIndex, this.getActivePlayer().cellState);
      this.nextPlayer();
    }
  }
}

Game.prototype.getActivePlayer = function() {
  return this.players[this.activePlayerIndex];
}

Game.prototype.move = function(player, cellIndex) {
  if (player === this.getActivePlayer()) {
    if (this.board.getCellByIndex(cellIndex) === CellState.EMPTY) {
      this.board.setCellByIndex(cellIndex, player.cellState);
      this.nextPlayer();
    }
  }

  this.aiMove();
}

Game.prototype.nextPlayer = function() {
  ++this.activePlayerIndex;
  if (this.activePlayerIndex >= this.players.length) {
    this.activePlayerIndex = 0;
  }
}

module.exports = Game;
