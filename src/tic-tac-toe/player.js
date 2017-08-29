const Ai = require('./ai.js')
const CellState = require('./cell-state.js')

function validateAiEnabled(aiEnabled) {
  if (aiEnabled === undefined) {
    return false;
  } else if (typeof aiEnabled == 'boolean') {
    return aiEnabled;
  } else {
    throw new Error('AiEnabled must be boolean.');
  }
}

function validateCellState(cellState) {
  if (cellState !== CellState.X &&
      cellState !== CellState.O) {
      throw new Error('CellState must be X or O.');
  }

  return cellState;
}

function Player(cellState, aiEnabled) {
  this.setCellState(cellState);
  this.setAiEnabled(aiEnabled);
}

Player.prototype.setAiEnabled = function(aiEnabled) {
  this.aiEnabled = validateAiEnabled(aiEnabled);

  if (this.aiEnabled) {
    this.ai = new Ai(this.cellState);
  } else {
    this.ai = null;
  }
}

Player.prototype.setCellState = function(cellState) {
  this.cellState = validateCellState(cellState);
  this.setAiEnabled(this.aiEnabled);
}

module.exports = Player;
