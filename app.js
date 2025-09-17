/*-------------------------------- Constants --------------------------------*/
const maxFlippedCards = 2;
const flipBackDelay = 1000;

/*-------------------------------- Variables --------------------------------*/
let flippedCards = [];
let matchedCards = [];
let score = 0;
let timer = 0;
let timerInterval;
let shuffled = []; //declared so it is accesible globally

/*------------------------ Cached Element References ------------------------*/
// Start Button to start
// To have a dropdown for difficulty selection
// board: The container that display the game
const startButton = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');
const board = document.getElementById('game-board');
const restartButton = document.getElementById('restart-btn');



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
  if (card1.getAttribute('data-symbol') === card2.getAttribute('data-symbol')) {
    // if cards matches
    card1.classList.add('matched');
    card2.classList.add('matched');

    matchedCards.push(card1, card2);
   // Add score
    score += 10;
    document.getElementById('score').textContent = score;
  

    if (matchedCards.length === shuffled.length) {
      clearInterval(timerInterval); //stop timer
      document.getElementById('message').textContent = 'Level Complete!';
      console.log("Level complete! Total time:", timer, "seconds");

    }

    //Flipped cards array will be cleared for next turn 
    flippedCards = [];

    // TODO: Score and Level complete done
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
  document.getElementById('message').textContent = '';
  restartButton.style.display = 'inline-block';  //Restart button when a new game starts
 console.log("Restart button is now visible");



  // Reset the game state before starting a new game
  // Clears any cards that were flipped or matched in the previous round
  flippedCards = [];
  matchedCards = [];
  console.log("Reset flippedCards and matchedCards arrays");
  // This is to resert score and the timer
  score = 0;
  timer = 0;
  document.getElementById('score').textContent = score;
  document.getElementById('timer').textContent = timer;

 console.log("Score reset to", score);
 console.log("Timer reset to", timer);


  clearInterval(timerInterval);
  timerInterval = setInterval(function () {
    timer++;

    document.getElementById('timer').textContent = timer;
  }, 1000);

  //Store the cards based on difficulty
  let symbols = [];

  if (difficulty === 'easy') {
    console.log("Difficulty selected: Easy");
    symbols = ['🥟', '🍕', '🥟', '🍕']; // 2 pairs
  }

  if (difficulty === 'medium') {
    console.log("Difficulty selected: Medium");
    symbols = ['🥟', '🍕', '🍟', '🍦', '🥟', '🍕', '🍟', '🍦']; // 4 pairs
  }

  if (difficulty === 'hard') {
    console.log("Difficulty selected: Hard");
    symbols = ['🥟', '🍕', '🍟', '🍦', '🍣', '🍔', '🥟', '🍕', '🍟', '🍦', '🍣', '🍔']; // 6 pairs
  }

  // Cards shuffling
  shuffled = shuffle(symbols); //Global variable
  console.log("Cards shuffled:", shuffled);

  // Loop through each card symbol and create a card element
  for (let i = 0; i < shuffled.length; i++) {
    const card = document.createElement('div');
    card.className = 'card'; 
    card.textContent = '';  // This is the start of an empty card as it is hidden first

    /*save the cards value inside the data symbol attribute
    and it also helps me identify which card is which when clicked*/
    card.setAttribute('data-symbol', shuffled[i]);

    card.addEventListener('click', function () {
  // If card is already flipped or matched, ignore clicks
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return; // do nothing
  }

  // If already 2 cards flipped, ignore clicks until cards are checked
  if (flippedCards.length === maxFlippedCards) {
    return; // do nothing
  }

  // Show the card's symbol and mark it as flipped
  card.textContent = card.getAttribute('data-symbol');
  card.classList.add('flipped');
  flippedCards.push(card);

  console.log("Card clicked:", card.getAttribute('data-symbol'));


  // Check for a match after a short delay(when 2 cards flipped)
  if (flippedCards.length === maxFlippedCards) {
    console.log("Two cards flipped, checking for match...");
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

restartButton.onclick = function() {
  console.log("Restart button clicked, restarting game...");
  const selectedDifficulty = difficultySelect.value;  //Current difficulty
  startGame(selectedDifficulty);  // Restart the game with the same difficulty
};




