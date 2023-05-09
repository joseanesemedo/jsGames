"use strict";

const moves = document.querySelector(".moves__count");
const timeValue = document.querySelector(".time");
const startButton = document.querySelector(".star");
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

const matrxiGenerator = (cardValues, size = 4) => {
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
};

// initial values and func calls
const initializer = () => {
  result.innerText = "";
  let cardValues = generateRandom();
  console.log(cardValues);
  matrxiGenerator(cardValues);
};

initializer();
