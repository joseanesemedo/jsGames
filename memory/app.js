"use strict";

const moves = document.querySelector(".moves__count");
const timeValue = document.querySelector(".time");
const startButton = document.querySelector(".start");
const stopButton = document.querySelector(".stop");
const gameContainer = document.querySelector(".game__container");
const result = document.querySelector(".result");
const controls = document.querySelector(".controls__container");

let cards, interval;
let firstCard = false;
let secondCard = false;

const items = [
  { name: "beam", image: "beam.png" },
  { name: "mirror", image: "mirror.png" },
  { name: "cook", image: "cook.png" },
  { name: "fire", image: "fire.png" },
  { name: "ice", image: "ice.png" },
  { name: "sleep", image: "sleep.png" },
  { name: "bomb", image: "bomb.png" },
  { name: "copy", image: "copy.png" },
  { name: "parasol", image: "parasol.png" },
  { name: "plasma", image: "plasma.png" },
  { name: "sword", image: "sword.png" },
  { name: "yoyo", image: "yoyo.png" },
];

// initial time
let seconds = 0,
  minutes = 0;

// initial moves and win count
let movesCount = 0,
  winCount = 0;

const timerGenerator = () => {
  seconds += 1;

  if (seconds >= 60) {
    minutes += 1;
    seconds = 0;
  }

  // format time
  let secondsValue = seconds < 10 ? `0${seconds}` : seconds;
  let minutesValue = minutes < 10 ? `0${minutes}` : minutes;
  timeValue.innerHTML = `<span>Time:</span>${minutesValue}:${secondsValue}`;
};

// calculate moves
const movesCounter = () => {
  movesCount++;
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
};

// pick random objects from the items array

const generateRandom = (size = 4) => {
  let tempArray = [...items];
  let cardValues = [];

  size = (size * size) / 2;

  // random object selection
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * tempArray.length);
    cardValues.push(tempArray[randomIndex]);
    //   remove selected object from temp array
    tempArray.splice(randomIndex, 1);
  }

  return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
  gameContainer.innerHTML = "";
  cardValues = [...cardValues, ...cardValues];

  //   shuffle
  cardValues.sort(() => Math.random() - 0.5);
  for (let i = 0; i < size * size; i++) {
    /*
        create cards
        before - front side
        after - back side
        data-card-values is a custom attribute which stores the names of the cards to match later
    */

    // prettier-ignore
    gameContainer.innerHTML += 
    `<div class="card__container" data-card-values="${cardValues[i].name}">
         <div class="card__before">?</div>
         <div class="card__after">
         <img src="${cardValues[i].image}" class="image">
         </div>
    </div>`;
  }

  gameContainer.style.gridTemplateColumns = `repeat(${size},auto)`;

  // cards
  let firstCardValue;
  cards = document.querySelectorAll(".card__container");
  cards.forEach((card) => {
    card.addEventListener("click", () => {
      // if selected card is not matched yet then only run

      if (!card.classList.contains("matched")) {
        // flip the card
        card.classList.add("flipped");

        // if it is the first card
        if (!firstCard) {
          // so current card will become firstCard
          firstCard = card;
          firstCardValue = card.getAttribute("data-card-value");
        } else {
          movesCounter();
          secondCard = card;
          let secondCardValue = card.getAttribute("data-card-value");
          if (firstCardValue === secondCardValue) {
            // if both cards match add matched class so these cards woul be ignored next time
            firstCardValue.classList.add("matched");
            secondCardValue.classList.add("matched");

            firstCard = false;
            winCount++;

            if (winCount === Math.floor(cardValues.length / 2)) {
              result.innerHTML = `<h2>You won</h2>`;
              stopGame();
            }
          } else {
            // cards dont match
            // flip cards back to normal
            let [tempFirst, tempSecond] = [firstCard, secondCard];
            firstCard = false;
            secondCard = false;
            let delay = setTimeout(() => {
              tempFirst.classList.remove("flipped");
              tempSecond.classList.remove("flipped");
            }, 900);
          }
        }
      }
    });
  });
};

// initial values and function calls
const initializer = () => {
  result.innerText = "";
  let cardValues = generateRandom();
  console.log(cardValues);
  matrixGenerator(cardValues);
};

startButton.addEventListener("click", () => {
  movesCount = 0;
  seconds = 0;
  minutes = 0;

  controls.classList.add("hide");
  stopButton.classList.remove("hide");
  startButton.classList.add("hide");

  interval = setInterval(timerGenerator, 1000);
  moves.innerHTML = `<span>Moves:</span>${movesCount}`;
  initializer();
});

stopButton.addEventListener("click", () => {
  controls.classList.remove("hide");
  stopButton.classList.add("hide");
});
