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
    }
  };

  const resetBoard = () => {
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        board[i][j].addMove(null);
      }
    }
  };

  return { getBoard, playMove, getCellValue, resetBoard };
})();

const Players = (() => {
  let players = ["X", "O"];
  return { players };
})();

const GameController = ((players) => {
  let activeTurn = players.players[0];
  let numberOfTurns = 0;
  let gameStatus = { gameFinished: false };
  let playerWinner = null;

  const _switchTurns = () => {
    activeTurn =
      activeTurn === players.players[0]
        ? players.players[1]
        : players.players[0];

    numberOfTurns += 1;
  };

  const _checkEndGame = () => {
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

      if (firstCell !== null && secondCell !== null && thirdCell !== null) {
        if (firstCell === secondCell && firstCell === thirdCell) {
          gameStatus.gameFinished = true;
          playerWinner = `Player: ${getPlayerTurn()} WINS!`;
          break;
        }
      }
      if (numberOfTurns === 8) {
        gameStatus.gameFinished = true;
        playerWinner = "Game tied!";
      }
    }
  };

  const getPlayerTurn = () => activeTurn;

  const playRound = (row, column, player) => {
    if (!gameStatus.gameFinished) {
      GameBoard.playMove(row, column, player);
      _checkEndGame();
      _switchTurns();
    }
  };

  const getWinner = () => {
    return playerWinner;
  };

  const resetGame = () => {
    activeTurn = players.players[0];
    numberOfTurns = 0;
    gameStatus.gameFinished = false;
    playerWinner = null;
  };

  return { gameStatus, getPlayerTurn, playRound, getWinner, resetGame };
})(Players);

const resetGame = () => {
  GameBoard.resetBoard();
  GameController.resetGame();
  DisplayController.resetDisplay();
};

const DisplayController = (function () {
  const board = GameBoard.getBoard();

  // cache DOM
  const gridSquares = document.querySelector("#game-board");
  const playerPrompt = document.querySelector("#player-prompt");

  const displayGameBoard = document.querySelector("#play-button");
  const theGameBoard = document.querySelector("#game-board");

  // displays the GameBoard
  const displayWithPlay = () => {
    let showBoard = false;

    displayGameBoard.addEventListener("click", () => {
      if (showBoard === false) {
        theGameBoard.style.display = "flex";
        playerPrompt.style.display = "flex";
        displayGameBoard.textContent = "Reset";
        showBoard = true;
      } else {
        resetGame();
      }
    });
  };

  const createSquares = (gridSquares, board, GameBoard) => {
    gridSquares.textContent = "";

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
    const gridCell = document.querySelectorAll(".grids");

    gridCell.forEach((cell) => {
      let row = cell.getAttribute("data-cell").slice(0, 1);
      let column = cell.getAttribute("data-cell").slice(1, 2);
      cell.addEventListener("click", () => {
        cell.setAttribute("style", "background: white;");
        GameController.playRound(row, column, GameController.getPlayerTurn());
        displayPlayerPrompt();
        createSquares(gridSquares, board, GameBoard);
      });
    });
  };

  const displayPlayerPrompt = () => {
    if (GameController.getWinner() === null) {
      playerPrompt.textContent = `Player ${GameController.getPlayerTurn()}'s turn!`;
    } else {
      playerPrompt.textContent = `${GameController.getWinner()}`;
    }

    if (GameController.gameStatus.gameFinished === true) {
      displayGameBoard.textContent = "Play Again!";
    }
  };

  const resetDisplay = () => {
    createSquares(gridSquares, GameBoard.getBoard(), GameBoard);
    displayPlayerPrompt();
    displayGameBoard.textContent = "Reset";
  };

  // render
  displayWithPlay();
  displayPlayerPrompt();
  createSquares(gridSquares, board, GameBoard);

  return { resetDisplay };
})();
