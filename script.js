const gameboard = (() => {
  let firstRow = ["x", "x", "x"];
  let secondRow = ["0", "0", "0"];
  let thirdRow = ["x", "x", "x"];
  return { firstRow, secondRow, thirdRow };
})();

const displayController = (() => {
  let numberOfSquares = 3;

  // cacheDOM
  const gridSquares = document.querySelector("#game-board");

  // render
  (function createSquares(numberOfSquares, gridSquares) {
    for (let i = 0; i < numberOfSquares; i++) {
      const column = document.createElement("div");
      column.setAttribute("class", "column");
      gridSquares.appendChild(column);

      for (let j = 0; j < numberOfSquares; j++) {
        const row = document.createElement("div");
        row.setAttribute("class", "grids");
        column.appendChild(row);
      }
    }
  })(numberOfSquares, gridSquares);
})();

const player = () => {};
