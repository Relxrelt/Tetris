gridMatrix = generateGridMatrix();
let gameState = false;
class Tetromino {
  // A piece in Tetris is called a Tetromino.

  // The position is 4x4 matrice that shows the current locations of a tetromino tile.
  // The Pivot is the index of the tetromino tile around which the tetromino is rotated.
  // canMove is a boolean value that indicates if the Tetromino is able to move 1 line down.
  constructor(position, pivot, canMove) {
    this.position = position;
    this.pivot = pivot;
    this.canMove = canMove;
  }
}

const sShape = new Tetromino(
  [
    [0, 4],
    [1, 4],
    [1, 5],
    [2, 5],
  ],
  2,
  true
);
const lShape = new Tetromino(
  [
    [0, 4],
    [1, 4],
    [2, 4],
    [2, 5],
  ],
  2,
  true
);
const oShape = new Tetromino(
  [
    [0, 4],
    [0, 5],
    [1, 4],
    [1, 5],
  ],
  2,
  true
);
const iShape = new Tetromino(
  [
    [0, 3],
    [0, 4],
    [0, 5],
    [0, 6],
  ],
  2,
  true
);
const jShape = new Tetromino(
  [
    [0, 4],
    [1, 4],
    [2, 4],
    [2, 3],
  ],
  2,
  true
);
const tShape = new Tetromino(
  [
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 4],
  ],
  2,
  true
);
const zShape = new Tetromino(
  [
    [0, 5],
    [1, 5],
    [1, 4],
    [2, 4],
  ],
  2,
  true
);

const shapesArray = [sShape, lShape, zShape, iShape, tShape, oShape, jShape];
let currentShape = tShape;

function generateNewLocation(tetromino) {
  for (let i = 0; i < tetromino.position.length; i++) {
    document.getElementById(
      `${tetromino.position[i][0]}:${tetromino.position[i][1]}`
    ).className = "tetromino";
  }
}

function moveTetrominoDown(tetromino) {
  for (let i = 0; i < tetromino.position.length; i++) {
    if (tetromino.position[i][0] === 19) {
      currentShape = shapesArray[getRandomInt(6)];
      generateNewLocation(currentShape);
      return;
    }
    if (
      document.getElementById(
        `${tetromino.position[i][0] + 1}:${tetromino.position[i][1]}`
      ).className === "tetromino" &&
      !arrayIncludesSubarray(tetromino.position, [
        tetromino.position[i][0] + 1,
        tetromino.position[i][1],
      ])
    ) {
      currentShape = shapesArray[getRandomInt(6)];
      generateNewLocation(currentShape);
      return;
    }
  }
  for (let i = 0; i < tetromino.position.length; i++) {
    document.getElementById(
      `${tetromino.position[i][0]}:${tetromino.position[i][1]}`
    ).className = "tile";
    tetromino.position[i][0]++;
  }
  generateNewLocation(tetromino);
}

function rotateTetromino(tetromino) {}

function generateGridMatrix() {
  // Generates a matrix with 20 rows and 10 columns.
  // The "E" in the arrays means an empty tile.

  gridMatrix = [];
  for (let i = 0; i < 20; i++) {
    rowArray = [];
    for (let j = 0; j < 10; j++) {
      rowArray.push("E");
    }
    gridMatrix.push(rowArray);
  }

  return gridMatrix;
}

function generateGrid() {
  // Generates the visual representation of the grid.
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 10; j++) {
      element = document.createElement("div");
      element.className = "tile";
      element.id = i + ":" + j;
      document.querySelector("#grid-system").appendChild(element);
    }
  }
}

function startButton() {
  document.getElementById("welcome-box").style.display = "none";
  generateGridMatrix();
  generateGrid();
  document.getElementById("grid-system").style.display = "grid";
  startGame();
}

function startGame() {
  gameState = true;
  generateNewLocation(currentShape);
  gameLoop();
}

function gameLoop() {
  tetrominoMovedSideways = false;
  if (!gameState) {
    return;
  }

  setTimeout(() => {
    moveTetrominoDown(currentShape);
    gameLoop();
  }, 150);
}
function moveTetrominoSideWays(tetromino, direction) {
  for (let i = 0; i < tetromino.position.length; i++) {
    if (
      tetromino.position[i][1] + direction < 0 ||
      tetromino.position[i][1] + direction > 9
    ) {
      return;
    }
  }
  for (let i = 0; i < tetromino.position.length; i++) {
    document.getElementById(
      `${tetromino.position[i][0]}:${tetromino.position[i][1]}`
    ).className = "tile";
  }
  for (let i = 0; i < tetromino.position.length; i++) {
    tetromino.position[i][1] += direction;
  }
  generateNewLocation(tetromino);
}

function arrayIncludesSubarray(arr, subarr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][0] === subarr[0] && arr[i][1] === subarr[1]) {
      return true;
    }
  }
  return false;
}

document.addEventListener("keydown", (event) => {
  let name = event.key;

  if (event.key === "ArrowLeft") {
    moveTetrominoSideWays(currentShape, -1);
  } else if (event.key === "ArrowRight") {
    moveTetrominoSideWays(currentShape, 1);
  }
});

document
  .querySelector("#welcome-button")
  .addEventListener("click", startButton);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
