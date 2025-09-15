//console.log(9);
//console.log("app.js");

// Function for shuffling
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


let flippedCards = [];
let matchedCards = [];

// choose the difficulty
function startGame(difficulty) {
  console.log("Starting game with difficulty: " + difficulty);


  const board = document.getElementById('game-board');

  //clear board for new game
  board.innerHTML = '';
  

 //reset
  flippedCards = [];
  matchedCards = [];
console.log("Reset flippedCards", "matchedCards arrays");
  

//Store the cards based on difficulty
let numbers = [];

if (difficulty === 'easy') {
  console.log("Difficulty selected: Easy");
  numbers = [1, 2, 1, 2]; // 2 pairs
  board.style.gridTemplateColumns = 'repeat(2, 1fr)';
}

if (difficulty === 'medium') {
  console.log("Difficulty selected: Medium");
  numbers = [1, 2, 3, 4, 1, 2, 3, 4]; // 4 pairs
  board.style.gridTemplateColumns = 'repeat(4, 1fr)';
}

if (difficulty === 'hard') {
  console.log("Difficulty selected: Hard");
  numbers = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]; // 6 pairs
  board.style.gridTemplateColumns = 'repeat(4, 1fr)';
}

// Cards shuffling
  const shuffled = shuffle(numbers);
  console.log("Cards shuffled:", shuffled);

}

//Start button and difficulty dropdown
const startButton = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');

//Start button clicked,get the difficulty value
//Start game function called with that difficulty to begin
startButton.onclick = function() {
  const selectedDifficulty = difficultySelect.value;
  console.log('Start button clicked. Selected difficulty:', selectedDifficulty);
  startGame(selectedDifficulty);
};