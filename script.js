// script.js
const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => document.querySelectorAll(selector);
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const setText = (element, text) => (element.innerText = text);

const cells = selectAll("[data-cell]");
const gameBoard = select("#gameBoard");
const gameStatus = select("#gameStatus");
const restartButton = select("#restartButton");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;

const initializeGame = () => {
  circleTurn = false;
  cells.forEach((cell) => {
    removeClass(cell, "x");
    removeClass(cell, "circle");
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverClass();
  setText(gameStatus, "X's turn");
};

const handleClick = (e) => {
  const cell = e.target;
  const currentClass = circleTurn ? "circle" : "x";
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
};

const placeMark = (cell, currentClass) => addClass(cell, currentClass);

const swapTurns = () => {
  circleTurn = !circleTurn;
  setText(gameStatus, `${circleTurn ? "O's" : "X's"} turn`);
};

const setBoardHoverClass = () => {
  removeClass(gameBoard, "x");
  removeClass(gameBoard, "circle");
  addClass(gameBoard, circleTurn ? "circle" : "x");
};

const checkWin = (currentClass) => {
  return winningCombinations.some((combination) => {
    return combination.every((index) =>
      cells[index].classList.contains(currentClass)
    );
  });
};

const endGame = (draw) => {
  if (draw) {
    setText(gameStatus, "It's a draw!");
  } else {
    setText(gameStatus, `${circleTurn ? "O's" : "X's"} Wins!`);
  }
  cells.forEach((cell) => cell.removeEventListener("click", handleClick));
};

const isDraw = () => {
  return [...cells].every(
    (cell) => cell.classList.contains("x") || cell.classList.contains("circle")
  );
};

restartButton.addEventListener("click", initializeGame);

initializeGame();
