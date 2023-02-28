const boardCells = document.querySelectorAll(".game-cell");
const whoseTurn = document.querySelector(".whoseTurn");
const turn = document.querySelector(".turn");
const result = document.querySelector(".result");
const player1WinCountEl = document.getElementById("player1WinCounts");
const player2WinCountEl = document.getElementById("player2WinCounts");
const playBtnEl = document.getElementById("playBtn");
const currentPlayerInfoEl = document.querySelector(".currentPlayerInfo");
// set a symbol
const human = "X";
const ai = "O";
let currentPlayer = human;

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
      cell.innerHTML = human;
      turn.innerHTML = "AI";
      // insert into array
      board[Math.floor(index / 3)][index % 3] = human;
      let result = checkWinner();
      if (result !== null) {
        showResult(scores[result]);
      } else {
        currentPlayer = ai;
        bestMove();
      }
    }
  }
  // // remove event listener
  // cell.removeEventListener("click", handleClick);
  // // check if someone won
  // checkWinner();
}

function showResult(symbol) {
  if (symbol === -10) {
    result.innerHTML = "Human Win! Game over!";
    playerOneWinCounts++;
    player1WinCountEl.innerHTML = playerOneWinCounts;
  } else if (symbol === 10) {
    result.innerHTML = "Computer AI Win! Game over!";
    playerTwoWinCounts++;
    player2WinCountEl.innerHTML = playerTwoWinCounts;
  } else {
    result.innerHTML = "Tie! Game over!";
  }
  gameIsLive = false;
}

function checkWinner() {
  let winner = null;
  // check for rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2] &&
      board[i][0] !== ""
    ) {
      //showResult(board[i][0]);
      winner = board[i][0];
      //return;
    }
  }
  // check for columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i] &&
      board[0][i] !== ""
    ) {
      //showResult(board[0][i]);
      winner = board[0][i];
      //return;
    }
  }
  // check for diagonals
  if (
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2] &&
    board[0][0] !== ""
  ) {
    //showResult(board[0][0]);
    winner = board[0][0];
    //return;
  }
  if (
    board[0][2] === board[1][1] &&
    board[0][2] === board[2][0] &&
    board[0][2] !== ""
  ) {
    //showResult(board[0][2]);
    winner = board[0][2];
    //return;
  }
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
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

// Tic Tac Toe AI with Minimax Algorithm
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/154-tic-tac-toe-minimax.html
// https://youtu.be/I64-UTORVfU
// https://editor.p5js.org/codingtrain/sketches/0zyUhZdJD

function bestMove() {
  // AI to make its turn
  let bestScore = -1000;
  var moveI = -1;
  var moveJ = -1;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          moveI = i;
          moveJ = j;
        }
      }
    }
  }
  board[moveI][moveJ] = ai;

  let boardIndex = moveI * 3 + moveJ;
  boardCells[boardIndex].textContent = ai;

  let result = checkWinner();
  if (result !== null) {
    showResult(scores[result]);
  }

  currentPlayer = human;
  turn.innerHTML = "Player 1";
}

let scores = {
  O: 10,
  X: -10,
  tie: 0,
};

function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          //bestScore = max(score, bestScore);
          if (score > bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = 1000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          //bestScore = min(score, bestScore);
          if (score < bestScore) {
            bestScore = score;
          }
        }
      }
    }
    return bestScore;
  }
}
