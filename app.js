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

  function checkForMatch() {
  const card1 = flippedCards[0];
  const card2 = flippedCards[1];

  // This is to check if data matches
  if (card1.getAttribute('data-number') === card2.getAttribute('data-number')) {
    // if cards matches
    card1.classList.add('matched');
    card2.classList.add('matched');

    matchedCards.push(card1, card2);

    //Flipped cards array will be cleared for next turn 
    flippedCards = [];

    // TODO: Please Please Please check again later for score update and level complete
  } else {
    // flip back if cards do not matched
    card1.textContent = '';
    card2.textContent = '';
    card1.classList.remove('flipped');
    card2.classList.remove('flipped');

    // flipped cards array will be clear for next turn
    flippedCards = [];
  }
}


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
  // If card is already flipped or matched, ignore clicks
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return; // do nothing
  }

  // If already 2 cards flipped, ignore clicks until cards are checked
  if (flippedCards.length === maxFlippedCards) {
    return; // do nothing
  }

  // Show the card's number and mark it as flipped
  card.textContent = card.getAttribute('data-number');
  card.classList.add('flipped');
  flippedCards.push(card);

  // If 2 cards are flipped, check for a match after a short delay
  if (flippedCards.length === maxFlippedCards) {
    setTimeout(checkForMatch, flipBackDelay);
  }
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
