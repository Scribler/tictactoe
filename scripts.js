//
// ** GAME BOARD **
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
    // board[row][column] = player.identifier; 
    board[row][column] = player.mark; // temp
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
function players() { // collect player info and return array of players     **inputs need to be sanitised**
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
// ** DISPLAY ** 
//

// DISPLAY game board in DOM
// UPDATE game board when needed

//
// ** GAME FLOW ** 
//
function game() {
  const [player1, player2] = players(); // GET "player1" and "player2"
  let currentPlayer = "";
  function getFirstPlayer() {
    currentPlayer = prompt("Who wants to go first? Enter 1 for player1, Enter 2 for player2, Leave blank for random.");
    if (currentPlayer !== "1" && currentPlayer !== "2") { // any entry other than 1 or 2 generates a random current player
      currentPlayer = (Math.ceil(Math.random() * 2)).toString();
    };
    
    switch (currentPlayer) {
      case ("1"):
        currentPlayer = player1;
        console.log(`${currentPlayer.name}, It's your turn.`);
        break;
      case ("2"):
        currentPlayer = player2;
        console.log(`${currentPlayer.name}, It's your turn.`);
        break;
      default:
        console.log("something went wrong");
    }
    return;
  }
  //
  // game flow >>
  //
  GameBoard.logBoard(); // print game board
  // getFirstPlayer();
  
  
}

// RUN GAME
game();
