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
  {
    name: "bee",
    image: "bee.png",
  },
];
