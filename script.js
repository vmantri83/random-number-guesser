// const random = Math.round(Math.random() * 100) + 1;
let random = parseInt(Math.random() * 100 + 1);
// console.log(random);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const lastResult = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 0;

let playGame = true; // always written in a game which helps you to start the game

if (playGame) {
  submit.addEventListener("click", function (e) {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  // validation if 1<=n<=100
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1 || guess > 100) {
    alert(`${guess} is not a number between 1 to 100`);
  } else {
    prevGuess.push(guess);
    if (numGuess > 9) {
      displayGuess(guess);
      displayMessage(`Game Over. Random Number was ${random}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  // value equal to random number or not
  if (guess === random) {
    displayMessage(`You guessed it right!!`);
    endGame();
  } else if (guess < random) {
    displayMessage(`${guess} is smaller than random number`);
  } else if (guess > random) {
    displayMessage(`${guess} is bigger than random number`);
  }
}

function displayGuess(guess) {
  // updation of arrays, interaction with DOM
  userInput.value = "";
  guessSlot.innerHTML += `${guess} , `;
  numGuess++;
  lastResult.innerHTML = `${10 - numGuess}`;
}

function displayMessage(message) {
  // adds value to innerHTML
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function newGame() {
  const startNewGame = document.querySelector("#newGame");
  startNewGame.addEventListener("click", function (e) {
    random = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 0;
    guessSlot.innerHTML = "";
    lastResult.innerHTML = `${10 - numGuess}`;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);

    playGame = true;
  });
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = '<h2 id="newGame">Start New Game</h2>';
  startOver.appendChild(p);
  playGame = false;
  newGame();
}
