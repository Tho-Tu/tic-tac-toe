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
    // resets board
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
    let winDetected = false;
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

      if (!winDetected && numberOfTurns === 8) {
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

  return { playRound, getPlayerTurn, getWinner };
})(Players);

const DisplayController = (function () {
  const board = GameBoard.getBoard();

  const gridSquares = document.querySelector("#game-board");
  const playerPrompt = document.querySelector("#player-prompt");

  const displayGameBoard = document.querySelector("#play-button");
  const theGameBoard = document.querySelector("#game-board");

  // displays/hides the GameBoard
  const displayWithPlay = () => {
    let showBoard = false;

    displayGameBoard.addEventListener("click", () => {
      if (showBoard === false) {
        theGameBoard.style.display = "flex";
        playerPrompt.style.display = "flex";
        showBoard = true;
      } else {
        theGameBoard.style.display = "none";
        playerPrompt.style.display = "none";
        showBoard = false;
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
  };

  // render
  displayWithPlay();
  displayPlayerPrompt();
  createSquares(gridSquares, board, GameBoard);
})();
