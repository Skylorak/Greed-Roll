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

/* modal*/
const modal = document.querySelector('.modal');
const btnInfoOpen = document.querySelector('.info');
const btnCloseModal = document.querySelector('.close-modal');

const overlay = document.querySelector('.overlay');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* Starting conditions */
let scores, currentScore, activePlayer, playing;
const init = () => {
  /* init logic */
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  playing = true;

  /* visual stuff */
  playerBox0El.classList.remove('player-win');
  playerBox1El.classList.remove('player-win');
  playerBox0El.classList.add('player--active');
  document.querySelector(`.player-0`).classList.remove('winner-text');
  document.querySelector(`.player-1`).classList.remove('winner-text');
  diceEl.classList.add('hidden');

  /* initial el scores */
  sumScore0El.textContent = 0;
  sumScore1El.textContent = 0;
  curScore0El.textContent = 0;
  curScore1El.textContent = 0;
};
init();

const switchPlayer = () => {
  document.getElementById(`cur-score--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerBox0El.classList.toggle('player--active');
  playerBox1El.classList.toggle('player--active');
};

/* Rolling dice functionality */
btnRoll.addEventListener('click', () => {
  if (playing) {
    /* Generating a random dice roll */
    const dice = Math.trunc(Math.random() * 6) + 1;

    /* Display dice */
    diceEl.classList.remove('hidden');
    diceEl.src = `./dice/dice-${dice}.png`;
    diceEl.alt = `Dice showing ${dice}`;

    /* Check for rolled 1 */
    if (dice !== 1) {
      /* Add dice to current score */
      currentScore += dice;

      document.getElementById(`cur-score--${activePlayer}`).textContent =
        currentScore;
    } else {
      /* Switch to next player */
      switchPlayer();
    }
  }
});

/* Score logic */
btnBank.addEventListener('click', () => {
  if (playing) {
    /* Add current score to active player's score */
    scores[activePlayer] += currentScore;

    /* scores[1] = scores[1] + currentScore; */
    document.getElementById(`sum-score--${activePlayer}`).textContent =
      scores[activePlayer];
    /* Check if player's score is >= 100 */
    if (scores[activePlayer] >= 100) {
      /* Finish the game */
      playing = false;
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('winner-text');
      document
        .querySelector(`.player--${activePlayer}-box`)
        .classList.remove('player--active');
      document
        .querySelector(`.player--${activePlayer}-box`)
        .classList.add('player-win');
      diceEl.classList.add('hidden');
    } else {
      /* Switch to the next player */
      switchPlayer();
    }
  }
});

/*  Reset logic */
btnReset.addEventListener('click', init);

/* Modal-info logic */
btnInfoOpen.addEventListener('click', () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

/* close modal logic */
btnCloseModal.addEventListener('click', () => {
  closeModal();
});

overlay.addEventListener('click', () => {
  closeModal();
});

document.querySelector('body').addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeModal();
  }
});
