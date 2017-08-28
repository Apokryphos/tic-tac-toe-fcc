const CellState = {
  EMPTY: 0,
  X: 1,
  O: 2,
  getOpponent: function(cellState) {
    switch (cellState) {
      default:
      case CellState.EMPTY:
        throw new Error('Specified CellState is invalid.');
      case CellState.X:
        return CellState.O;
      case CellState.O:
      return CellState.X;
    }
  }
};

module.exports = CellState;
