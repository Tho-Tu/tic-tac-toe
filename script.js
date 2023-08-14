const Cell = () => {
  let value = null;

  const addMove = (player) => {
    value = player;
  };

  const getValue = () => value;

  return {
    addMove,
    getValue,
  };
};

const Gameboard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell.getValue);
    }
  }

  const getBoard = () => board;

  const playMove = (row, column, player) => {
    board[row][column].addMove(player);
  };

  return { getBoard, playMove };
})();

const Players = () => {
  let players = ["X", "O"];
  return { players };
};

// flow of game
const GameController = (players) => {
  let activeTurn = players[0];

  const switchTurns = () => {
    activeTurn === players[0] ? players[1] : players[0];
  };
  const getPlayerTurn = () => activeTurn;

  return { switchTurns, getPlayerTurn };
};

// visual representation
const DisplayController = (function () {
  let numberOfSquares = 3;

  // cacheDOM
  const gridSquares = document.querySelector("#game-board");

  // render
  (function createSquares(numberOfSquares, gridSquares, Gameboard) {
    let index = 0;
    for (let i = 0; i < numberOfSquares; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      gridSquares.appendChild(column);

      for (let j = 0; j < numberOfSquares; j++) {
        const row = document.createElement("div");
        row.setAttribute("class", "grids");
        row.textContent = Gameboard.getBoard[index];
        column.appendChild(row);

        index += 1;
      }
    }
  })(numberOfSquares, gridSquares, Gameboard);
})();
