//
// GAME BOARD
//
const GameBoard = (function(){
  // Variables
  const board = [];
  const rows = 3;
  const columns = 3;
  const [player1, player2] = players(); // assign the returned players to usable variables
  

  for (let i = 0; i < rows; i++) { // Setting up game board START
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = 0;
    }
  }

  function placeMark(player, row, column) { 
    board[row][column] = player.identifier; 
  }

  function logBoard() { // log the game board readably
    console.log(board[0]);
    console.log(board[1]);
    console.log(board[2]);
  }

  return { placeMark, logBoard};

})();

//
// PLAYERS
//
function players() { // set player info and return array of players     **inputs need to be sanitised**
  let playerOneDefaultOrder = 0;
  let playerTwoDefaultOrder = 1;
  
  const player1 = {
    name: "Player 1", // temp name
    mark: "X",   // temp mark
    identifier: 1,
    playOrder: playerOneDefaultOrder,
  }
  
  const player2 = {
    name: "Player 2", // temp name
    mark: "O",     // temp mark
    identifier: 2,
    playOrder: playerTwoDefaultOrder,
  }
  return [player1, player2];
}

//
// DISPLAY
//
function gameDisplay(){
  function printScreen(){
    console.log("printScreen");
  }
  return { printScreen };
}

//
// GAME FLOW
//
function game() {
  const [player1, player2] = players(); // assign the returned players to usable variables
  GameBoard.placeMark(player1, 0, 1);
  GameBoard.placeMark(player2, 1, 1);
  GameBoard.placeMark(player1, 2, 1);
  GameBoard.logBoard();
  gameDisplay.printScreen();
}

game();
