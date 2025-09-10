'use strict';

/* Selecting elements */
/* 1 PLAYER */
const playerBox0El = document.querySelector('.player--0-box');
const sumScore0El = document.getElementById('sum-score--0');
const curScore0El = document.getElementById('cur-score--0');
/* 2 PLAYER */
const playerBox1El = document.querySelector('.player--1-box');
const sumScore1El = document.getElementById('sum-score--1');
const curScore1El = document.getElementById('cur-score--1');

/* Dice Image */
const diceEl = document.querySelector('.dice');

/* Selecting buttons */
const btnRoll = document.querySelector('.roll');
const btnBank = document.querySelector('.bank');
const btnReset = document.querySelector('.reset');

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

/* Starting conditions */
sumScore0El.textContent = 0;
sumScore1El.textContent = 0;
diceEl.classList.add('hidden');

/* Rolling dice functionality */
btnRoll.addEventListener('click', () => {
  /* Generating a random dice roll */
  const dice = Math.trunc(Math.random() * 6) + 1;

  /* Display dice */
  diceEl.classList.remove('hidden');
  diceEl.src = `./dice/dice-${dice}.png`;

  /* Check for rolled 1 */
  if (dice !== 1) {
    /* Add dice to current score */
    currentScore += dice;

    document.getElementById(`cur-score--${activePlayer}`).textContent =
      currentScore;
  } else {
    document.getElementById(`cur-score--${activePlayer}`).textContent = 0;

    /* Switch to next player */
    activePlayer = activePlayer === 0 ? 1 : 0;
    document;
    playerBox0El.classList.toggle('player--active');
    playerBox1El.classList.toggle('player--active');
    currentScore = 0;
  }
});
