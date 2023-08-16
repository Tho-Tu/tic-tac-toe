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
    return board;
  };

  const getCellValue = (row, column) => {
    return board[row][column].getValue();
  };

  const playMove = (row, column, player) => {
    if (getCellValue(row, column) === null) {
      board[row][column].addMove(player);
    } else {
      return;
    }
  };

  return { getBoard, playMove, getCellValue };
})();

const Players = (() => {
  let players = ["X", "O"];
  return { players };
})();

const GameController = (players) => {
  const board = GameBoard;
  let activeTurn = players.players[0];

  const _switchTurns = () => {
    activeTurn =
      activeTurn === players.players[0]
        ? players.players[1]
        : players.players[0];
  };
  const getPlayerTurn = () => activeTurn;

  const _endGame = () => {
    // logic to decide winner or draw
    const winConditions = [
      [
        [0, 0],
        [0, 1],
        [0, 2],
      ],
      [
        [1, 0],
        [1, 1],
        [1, 2],
      ],
      [
        [2, 0],
        [2, 1],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 0],
        [2, 0],
      ],
      [
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, 2],
        [1, 2],
        [2, 2],
      ],
      [
        [0, 0],
        [1, 1],
        [2, 2],
      ],
      [
        [0, 2],
        [1, 1],
        [2, 0],
      ],
    ];

    for (const winCell of winConditions) {
      let firstCell = board.getCellValue(winCell[0][0], winCell[0][1]);
      let secondCell = board.getCellValue(winCell[1][0], winCell[1][1]);
      let thirdCell = board.getCellValue(winCell[2][0], winCell[2][1]);
      if (firstCell !== null) {
        if (firstCell === secondCell && firstCell === thirdCell) {
          console.log(`Player: ${getPlayerTurn()} WINS!`);
          break;
        } else {
          console.log("Players Draw!");
        }
      }
    }
  };

  const playRound = () => {
    _endGame();
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
