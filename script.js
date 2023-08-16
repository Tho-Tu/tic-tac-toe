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

const GameBoard = (function () {
  const rows = 3;
  const columns = 3;
  const board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  const getBoard = () => {
    for (const row of board) {
      for (const cell of row) {
        console.log(cell.getValue());
      }
    }
    return board;
  };

  const playMove = (row, column, player) => {
    if (board[row][column].getValue() === null) {
      board[row][column].addMove(player);
    } else {
      return;
    }
  };

  return { getBoard, playMove };
})();

const Players = (() => {
  let players = ["X", "O"];
  return { players };
})();

const GameController = (players) => {
  let activeTurn = players.players[0];

  const _switchTurns = () => {
    activeTurn =
      activeTurn === players.players[0]
        ? players.players[1]
        : players.players[0];
  };
  const getPlayerTurn = () => activeTurn;

  const endGame = () => {
    // logic to decide winner or draw
  };

  const playRound = () => {
    _switchTurns();
  };

  return { playRound, getPlayerTurn };
};

// visual representation
const DisplayController = (function () {
  // let numberOfSquares = 3;

  const game = GameController(Players);

  // cacheDOM
  const gridSquares = document.querySelector("#game-board");

  // update screen

  gridSquares.textContent = "";

  // render
  (function createSquares(numberOfSquares, gridSquares, GameBoard) {
    let index = 0;
    for (let i = 0; i < numberOfSquares; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      gridSquares.appendChild(column);

      for (let j = 0; j < numberOfSquares; j++) {
        const row = document.createElement("div");
        row.setAttribute("class", "grids");
        row.textContent = GameBoard.getBoard[index];
        column.appendChild(row);

        index += 1;
      }
    }
  })(numberOfSquares, gridSquares, GameBoard);
})();
