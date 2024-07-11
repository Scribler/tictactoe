//
// ** GAME BOARD **
//
const GameBoard = (function(){
  // Variables
  const board = [];
  const rows = 3;
  const columns = 3;
  const [player1, player2] = players(); // assign the returned players to usable variables
  // Setting up game board START
  for (let i = 0; i < rows; i++) { 
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i][j] = 0;
    }
  }
  // place mark on board (and check if location already occupied)
  function placeMark(player) { 
    let [firstCoordinate, secondCoordinate] = prompt(`${player.name}, Where would you like to place your mark?`).split("");
    if ((board)[firstCoordinate][secondCoordinate] === 0) {
    // board[row][column] = player.identifier;
      board[firstCoordinate][secondCoordinate] = player.mark; // temp
    } else {
      placeMark(player);
    }
  }
  // show gameboard's current state in console
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
  // player one
  const player1 = {
    name: "Player 1", // temp name
    mark: "X",   // temp mark
    identifier: 1,
    playOrder: playerOneDefaultOrder,
  }
  // player two
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
  // load players
  const [player1, player2] = players(); // GET "player1" and "player2"
  // store current player
  let currentPlayer = "";
  // who's turn to start
  function getFirstPlayer() {
    currentPlayer = prompt("Who wants to go first? Enter 1 for player1, Enter 2 for player2, Leave blank for random.");
    if (currentPlayer !== "1" && currentPlayer !== "2") { // any entry other than 1 or 2 generates a random current player
      currentPlayer = (Math.ceil(Math.random() * 2)).toString();
    };
    switch (currentPlayer) {
      case ("1"):
        currentPlayer = player1;
        break;
      case ("2"):
        currentPlayer = player2;
        break;
      default:
        console.log("something went wrong");
    }
    return;
  }
  // game round logic
  function playRound() {
    for (let i = 0; i < 10; i++) {
      if (i < 9) {
        console.log(`${currentPlayer.name}, it's your turn!`);
        GameBoard.logBoard();
      } else {
        console.log("Game Over!");
        GameBoard.logBoard();
        break;
      }
      GameBoard.placeMark(currentPlayer);
      switch(currentPlayer.identifier) { // change player when turn is done
        case 1:
          currentPlayer = player2;
          break;
        case 2:
          currentPlayer = player1;
          break;
        default:
          console.log("Something borked");
      }
    }
  }
  //
  // game flow >>
  //
  getFirstPlayer();
  playRound();
}

// RUN GAME
game();
