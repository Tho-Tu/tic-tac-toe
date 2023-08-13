const gameBoard = (() => {
  let gameArray = ["x", "x", "x", "x", "x", "x", "x", "x", "x"];
  return { gameArray };
})();

const players = () => {
  let people = ["playerX", "playerO"];

  return { people };
};

const renderGameBoard = (() => {
  let numberOfSquares = 3;

  // cacheDOM
  const gridSquares = document.querySelector("#game-board");

  // render
  (function createSquares(numberOfSquares, gridSquares, gameBoard) {
    let index = 0;
    for (let i = 0; i < numberOfSquares; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      gridSquares.appendChild(column);

      for (let j = 0; j < numberOfSquares; j++) {
        const row = document.createElement("div");
        row.setAttribute("class", "grids");
        row.textContent = gameBoard.gameArray[index];
        column.appendChild(row);

        index += 1;
      }
    }
  })(numberOfSquares, gridSquares, gameBoard);
})();

const displayController = () => {};
