/*-------------------------------- Constants --------------------------------*/
const maxFlippedCards = 2;
const flipBackDelay = 1000;

/*-------------------------------- Variables --------------------------------*/
let flippedCards = [];
let matchedCards = [];

/*------------------------ Cached Element References ------------------------*/
// Start Button to start
// To have a dropdown for difficulty selection
// board: The container that display the game
const startButton = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const board = document.getElementById('game-board');

/*-------------------------------- Functions --------------------------------*/
// Function for shuffling
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); //https://www.w3schools.com/js/js_random.asp
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// choose the difficulty
function startGame(difficulty) {
  console.log("Starting game with difficulty: " + difficulty);

  //clear board for new game
  board.innerHTML = '';

  // Reset the game state before starting a new game
  // Clears any cards that were flipped or matched in the previous round
  flippedCards = [];
  matchedCards = [];
  console.log("Reset flippedCards and matchedCards arrays");

  //Store the cards based on difficulty
  let numbers = [];

  if (difficulty === 'easy') {
    console.log("Difficulty selected: Easy");
    numbers = [1, 2, 1, 2]; // 2 pairs
  }

  if (difficulty === 'medium') {
    console.log("Difficulty selected: Medium");
    numbers = [1, 2, 3, 4, 1, 2, 3, 4]; // 4 pairs
  }

  if (difficulty === 'hard') {
    console.log("Difficulty selected: Hard");
    numbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; // 6 pairs
  }

  // Cards shuffling
  const shuffled = shuffle(numbers);
  console.log("Cards shuffled:", shuffled);

  // Loop through each card number and create a card element
  for (let i = 0; i < shuffled.length; i++) {
    const card = document.createElement('div');
    card.className = 'card'; 
    card.textContent = '';  // This is the start of an empty card as it is hidden first

    /*save the cards value inside the data number attribute
    and it also helps me identify which card is which when clicked*/
    card.setAttribute('data-number', shuffled[i]);

    card.addEventListener('click', function () {
      // Show the number when clicked
      card.textContent = card.getAttribute('data-number');
      // This will help me check if the card is working
      console.log("Card clicked:", card.getAttribute('data-number'));
    });

    // Add the card to the board
    board.appendChild(card);
  }
}

/*----------------------------- Event Listeners -----------------------------*/
//Start button clicked,get the difficulty value
//Start game function called with that difficulty to begin
startButton.onclick = function() {
  const selectedDifficulty = difficultySelect.value;
  console.log('Start button clicked. Selected difficulty:', selectedDifficulty);
  startGame(selectedDifficulty);
};
