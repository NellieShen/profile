const boardCells = document.querySelectorAll(".game-cell");
const whoseTurn = document.querySelector(".whoseTurn");
const turn = document.querySelector(".turn");
const result = document.querySelector(".result");
const player1WinCountEl = document.getElementById("player1WinCounts");
const player2WinCountEl = document.getElementById("player2WinCounts");
const playBtnEl = document.getElementById("playBtn");
const currentPlayerInfoEl = document.querySelector(".currentPlayerInfo");
// set a symbol
const playerOne = "X";
const playerTwo = "O";
// board array
var board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];
// player win times
let playerOneWinCounts = 0;
let playerTwoWinCounts = 0;

// game variables
let gameIsLive = true;

// play with friends or computer;
let playWithFriend = true;

// spaceleft bollean value
var spaceLeft = false;

// start the game
startGame();

function startGame() {
  gameIsLive = true;
  boardCells.forEach((cell, index) => {
    cell.innerHTML = "";
    result.innerHTML = "";
    cell.addEventListener("click", handleClick.bind(null, cell, index));
  });
}

function handleClick(cell, index) {
  if (!gameIsLive) {
    return;
  }

  const cellValue = cell.innerHTML;
  if (cellValue === "") {
    if (turn.innerHTML === "Player 1") {
      cell.innerHTML = playerOne;
      turn.innerHTML = "Player 2";
      // insert into array
      board[Math.floor(index / 3)][index % 3] = playerOne;
      checkWinner();
      if (!playWithFriend && spaceLeftFunc() && gameIsLive) {
        computerMove();
      }
    } else {
      turn.innerHTML = "Player 1";
      cell.innerHTML = playerTwo;
      // insert into array
      board[Math.floor(index / 3)][index % 3] = playerTwo;
    }
  }
  // remove event listener
  cell.removeEventListener("click", handleClick);
  // check if someone won
  checkWinner();
}

function checkWinner() {
  // check for rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2] &&
      board[i][0] !== ""
    ) {
      showResult(board[i][0]);
      return;
    }
  }
  // check for columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      showResult(board[0][i]);
      return;
    }
  }
  // check for diagonals
  if (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[0][0] !== ""
  ) {
    showResult(board[0][0]);
    return;
  }
  if (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[0][2] !== ""
  ) {
    showResult(board[0][2]);
    return;
  }
  // check for a tie
  // if all cells are filled and no winner
  var count = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] != "") {
        count++;
      }
    }
  }
  if (count == 9) {
    showResult("Tie");
    return;
  }
}

function showResult(symbol) {
  if (symbol === playerOne) {
    result.innerHTML = "Player 1 Win! Game over!";
    playerOneWinCounts++;
    player1WinCountEl.innerHTML = playerOneWinCounts;
  } else if (symbol === playerTwo) {
    result.innerHTML = "Player 2 Win! Game over!";
    playerTwoWinCounts++;
    player2WinCountEl.innerHTML = playerTwoWinCounts;
  } else {
    result.innerHTML = "Tie! Game over!";
  }
  gameIsLive = false;

  //whoseTurn.innerHTML = "Game over!";
}

function restartGame() {
  turn.innerHTML = "Player 1";
  gameIsLive = true;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  startGame();
}

function changePlayer() {
  console.log("inside changeplayer fun" + playBtnEl.innerText);
  if (playBtnEl.value == "Play with friend") {
    playBtnEl.value = "Play with computer";
    playBtnEl.innerText = "Play with computer";
    playWithFriend = true;
    currentPlayerInfoEl.innerHTML = "You are playing with friend now.";
    restartGame();
  } else {
    playBtnEl.value = "Play with friend";
    playBtnEl.innerText = "Play with friend";
    playWithFriend = false;
    currentPlayerInfoEl.innerHTML = "You are playing with computer now.";
    restartGame();
  }
}

// let the computer make the next move
function computerMove() {
  var emptyCells = [];
  var random;

  boardCells.forEach(function (cell, index) {
    if (cell.textContent == "") {
      //emptyCells.push(cell);
      emptyCells.push({ cell: cell, index: index });
    }
  });

  random = Math.ceil(Math.random() * emptyCells.length) - 1;
  emptyCells[random].cell.textContent = playerTwo;
  var index = emptyCells[random].index;
  board[Math.floor(index / 3)][index % 3] = playerTwo;

  // remove event listener
  //   cell.removeEventListener("click", handleClick);
  // check if someone won
  checkWinner();
  turn.innerHTML = "Player 1";
}

function spaceLeftFunc() {
  for (let i = 0; i < boardCells.length; i++) {
    if (boardCells[i].textContent == "") {
      spaceLeft = true;
      return true;
    }
  }
  return false;
}
