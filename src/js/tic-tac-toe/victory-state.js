const CellState = require('./cell-state.js');

const VictoryState = {
  NONE: 0,
  X: 1,
  O: 2,
  DRAW: 3,
  getCellState: function(victoryState) {
    switch (victoryState) {
      default:
        throw new Error('Specified VictoryState does not match a CellState.');
      case VictoryState.X:
        return CellState.X;
      case VictoryState.O:
        return CellState.O;
    }
  }
};

module.exports = VictoryState;
