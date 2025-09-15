console.log(9);
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
}
