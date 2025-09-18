/*-------------------------------- Constants --------------------------------*/
// These are fixed values use throughout the game
const maxFlippedCards = 2; // Maximum cards flipped at one time before checking match
const flipBackDelay = 1000; // Delay (in ms) before flipping cards back if no match
const maxLevel = 3;         // Total number of levels in the game


/*-------------------------------- Variables --------------------------------*/
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 0;
let timerInterval;
let shuffled = [];
let currentLevel = 0;
let timeLimit = 0;
let gameOver = false;
let totalScore = 0;   
let totalTime = 0; 

/*------------------------ Cached Element References ------------------------*/
const startButton = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');

/*-------------------------------- Functions --------------------------------*/
// Converts numeric level to string difficulty in the game
function levelToDifficulty(level) {
  if (level === 1) return 'easy';
  if (level === 2) return 'medium';
  if (level === 3) return 'hard';
}

// Shuffle function for the array symbols so cards are randomly placed
// Fisher-Yates shuffle
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));// https://www.w3schools.com/js/js_random.asp
     // Swap elements at positions i and j
    [array[i], array[j]] = [array[j], array[i]]; // https://www.w3schools.com/js/js_array_sort.asp
  }
  return array;
}

// Starts the game with the selected difficulty
function startGame(difficulty) {
  console.log("Starting game with difficulty:", difficulty);

  
  // Set currentLevel based on difficulty string chosen
  if (difficulty === 'easy') currentLevel = 1;
  else if (difficulty === 'medium') currentLevel = 2;
  else if (difficulty === 'hard') currentLevel = 3;

  // Update level display on the page
  document.getElementById('level').textContent = currentLevel;
  // Reset total score and time if we start from the first level
  if (currentLevel === 1) {
    totalScore = 0;
    totalTime = 0;
    console.log("Reset total score and total time");
  }

  
  // Set time limit for each level (more time for harder levels)
  if (currentLevel === 1) timeLimit = 15;
  else if (currentLevel === 2) timeLimit = 30;
  else if (currentLevel === 3) timeLimit = 45;

  console.log("Time limit set to:", timeLimit);

  // Clear the board and reset game state variables
  board.innerHTML = ''; /* Remove all cards from board and uses board.innerHTML
  because it removes the entire contents including card elementss*/ //https://www.codecademy.com/resources/docs/javascript/dom-manipulation/innerHTML
  document.getElementById('message').textContent = '';// Clear messages
  restartButton.style.display = 'inline-block'; // Show restart button
  flippedCards = [];
  matchedCards = [];
  score = 0;
  timer = 0;
  gameOver = false;
  clearInterval(timerInterval);// Stop any running timer
   
   // Reset score and timer display
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timer;

  // Set symbols based on difficulty
  let symbols = [];
  if (difficulty === 'easy') {
    symbols = ['🥟', '🍕', '🥟', '🍕'];
  } else if (difficulty === 'medium') {
    symbols = ['🥟', '🍕', '🍟', '🍦', '🥟', '🍕', '🍟', '🍦'];
  } else if (difficulty === 'hard') {
    symbols = ['🥟', '🍕', '🍟', '🍦', '🍣', '🍔', '🥟', '🍕', '🍟', '🍦', '🍣', '🍔'];
  }
  // Shuffle the symbols array to randomize card positions
  shuffled = shuffle(symbols);

   // Create card elements and add them to the board
//for loop here to go through each symbol in the shuffled array
// For each symbol, created a new card div element, set its class and attributes, and add it to the game board
  for (let i = 0; i < shuffled.length; i++) {
    const card = document.createElement('div');
    card.className = 'card';// Add card class for styling
    card.textContent = ''; // Cards start face down (no symbol showing)
    card.setAttribute('data-symbol', shuffled[i]); // Store symbol in data attribute so can check matches later

// Add click event listener for each card so it responds when the player clicks on it
    card.addEventListener('click', function () {
      // To check if the game is over, if yes, player do not want player to flip any cards
      if (gameOver) return;

      //Check if the clicked card is already flipped or matched
  // If it is, ignore the click to prevent flipping it again or messing up the game logic
      if (card.classList.contains('flipped') || card.classList.contains('matched')) return;
      
      //Limit how many cards can be flipped at the same time (maximum 2)
  // Makes sure the player can’t flip more than 2 cards before the game checks for a match
      if (flippedCards.length === maxFlippedCards) return;


      // Start the timer when the player flips the first card (timer counts seconds) 
      
       if (flippedCards.length === 0 && timer === 0) {
        timerInterval = setInterval(function () {
          timer++;
          document.getElementById('timer').textContent = timer;
          // If timer reaches timeLimit, stop game and show message
          if (timer >= timeLimit) {
            clearInterval(timerInterval);
            gameOver = true;
            document.getElementById('message').textContent = "Time's up! You lost!";
            console.log("Game Over: Time limit reached.");
          }
        }, 1000);// Interval runs every 1000 ms (1 second)
      }
        // Show the symbol on the card and mark it as flipped
      card.textContent = card.getAttribute('data-symbol');
      card.classList.add('flipped');
      flippedCards.push(card);
      
      if (flippedCards.length === maxFlippedCards) {
        setTimeout(checkForMatch, flipBackDelay);
      }
    });
    // Add the card element to the board container
    board.appendChild(card);
  }
}

// This function checks if the two flipped cards match
function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];
// Compare the symbols of the two cards
  if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
    // If they match, add 'matched' class and update matchedCards array
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    
    // Increase score by 10 points for each match
    score += 10;
    document.getElementById('score').textContent = score;

    // Check if all cards are matched to complete the level
    if (matchedCards.length === shuffled.length) {
      clearInterval(timerInterval);
      document.getElementById('message').textContent = 'Level Complete!';
      console.log("Level complete!");

      totalScore += score;
      totalTime += timer;
      console.log(`Level ${currentLevel} complete! Total Score: ${totalScore}, Total Time: ${totalTime} seconds`);


      gameOver = true;// Stop any further actions until next level or game end


      setTimeout(() => {
        if (currentLevel < maxLevel) {
     currentLevel++;
     console.log("Starting next level:", currentLevel);
    
     // Update difficulty select dropdown for next level
    difficultySelect.value = levelToDifficulty(currentLevel);
    startGame(levelToDifficulty(currentLevel));
    } else {
      // Game completed, show final score and total time
    document.getElementById('message').textContent = 
    `Game Complete! Total Score: ${totalScore}, Total Time: ${totalTime} seconds`;
    console.log("Game Complete!");
    }
      }, 2000);
    }
    } else {
      // If cards don't match, flip them back face down
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');
  }

  // Reset flippedCards array to allow next attempt
  flippedCards = [];
}

/*----------------------------- Event Listeners -----------------------------*/
// When the start button is clicked, get the selected difficulty and start the game
startButton.onclick = function () {
  const selectedDifficulty = difficultySelect.value;
  console.log('Start button clicked. Selected difficulty:', selectedDifficulty);
  startGame(selectedDifficulty); // Pass difficulty string directly
};
// When the restart button is clicked, restart the game with current difficulty
restartButton.onclick = function () {
  const selectedDifficulty = difficultySelect.value;
  console.log("Restart button clicked. Restarting game with difficulty:", selectedDifficulty);
  startGame(selectedDifficulty);
};
