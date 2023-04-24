let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};
localStorage.getItem(score);

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  }

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "You win.") {
    score.wins += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".js-result").innerHTML = result;

  //   document.querySelector(".js-moves").innerHTML =
  //     "You: " + playerMove + " - " + "Computer: " + computerMove;
  document.querySelector(".js-moves").innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
  updateScore();
}

function updateScore() {
  document.querySelector(".js-score").innerHTML =
    "Wins: " +
    score.wins +
    ", Losses: " +
    score.losses +
    ", Ties: " +
    score.ties;
}

function pickComputerMove() {
  let randomNumber = Math.floor(Math.random() * 3 + 1);
  let computerMove = "";
  if (randomNumber === 1) {
    computerMove = "rock";
  } else if (randomNumber === 2) {
    computerMove = "paper";
  } else if (randomNumber === 3) {
    computerMove = "scissors";
  }
  return computerMove;
}

function resetScore() {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
  updateScore();
}

let isAutoPlaying = false;
let intervalId;
function autoplay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 2000);
    isAutoPlaying = true;
    document.querySelector(".js-autoplay-button").innerHTML = "Stop Autoplay";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector(".js-autoplay-button").innerHTML = "Autoplay";
  }
}
