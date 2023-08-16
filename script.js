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
  let activeTurn = players.players[0];
  let numberOfTurns = 0;

  const _switchTurns = () => {
    activeTurn =
      activeTurn === players.players[0]
        ? players.players[1]
        : players.players[0];

    numberOfTurns += 1;
  };

  const _endGame = () => {
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
      let firstCell = GameBoard.getCellValue(winCell[0][0], winCell[0][1]);
      let secondCell = GameBoard.getCellValue(winCell[1][0], winCell[1][1]);
      let thirdCell = GameBoard.getCellValue(winCell[2][0], winCell[2][1]);
      if (firstCell === secondCell && firstCell === thirdCell) {
        console.log(`Player: ${getPlayerTurn()} WINS!`);
        break;
      } else if (numberOfTurns === 9) {
        console.log("Game tied!");
      }
    }
  };

  const getPlayerTurn = () => activeTurn;

  const playRound = () => {
    _endGame();
    _switchTurns();
    DisplayController();
  };

  return { playRound, getPlayerTurn };
};

const DisplayController = function () {
  const game = GameController(Players);

  // cacheDOM
  const gridSquares = document.querySelector("#game-board");
  const gridCell = document.querySelectorAll(".grids");

  //bind events
  gridCell.forEach((cell) => {
    let row = cell.getAttribute("data-cell").slice(0, 1);
    let column = cell.getAttribute("data-cell").slice(1, 2);
    cell.addEventListener("click", () => {
      GameBoard.playMove(row, column, game.getPlayerTurn());
      createSquares(gridSquares, board, GameBoard);
    });
  });

  // update screen
  gridSquares.textContent = "";

  const board = GameBoard.getBoard();

  // render
  const createSquares = (gridSquares, board, GameBoard) => {
    // let index = 0;
    for (let i = 0; i < board.length; i++) {
      const row = document.createElement("div");
      row.setAttribute("class", "row");
      gridSquares.appendChild(row);

      for (let j = 0; j < board[i].length; j++) {
        const cell = document.createElement("button");
        cell.setAttribute("class", "grids");
        cell.setAttribute("data-cell", `${i}${j}`);
        cell.textContent = GameBoard.getCellValue(i, j);
        row.appendChild(cell);
      }
    }
  };
  createSquares(gridSquares, board, GameBoard);
};

DisplayController();
