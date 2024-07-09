//
// GAME BOARD
//
const GameInit = (function(){
  // Variables
  const gameBoard = [];
  const rows = 3;
  const columns = 3;
  const [player1, player2] = playerSetup(); // assign the returned players to usable variables
  
  function playerSetup() { // set player info and return array of players     **inputs need to be sanitised**
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
  
  for (let i = 0; i < rows; i++) { // Setting up game board START
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i][j] = 0;
    }
  }


  function placeMark () { // place a mark on the board. REQUIRES => (PLAYER)(ROW)(COLUMN)
    const currentPlayer = prompt("Who's turn is it?");
    const row = prompt("row?");
    const column = prompt("column?");
    let player;
    if (currentPlayer === "2") {
      player = player2;
    } else if (currentPlayer === "1"){
      player = player1;
    } else {
      console.error("error");
      
    }
    gameBoard[row][column] = player.identifier; // player not yet defined
  }

  function logBoard() {
    console.log(gameBoard);
  }

  return { placeMark, logBoard, showPlayers };

})();

//
//
//
//
//
// PLAY ROUND
//
//
//
//
//

// "To start round 'click' who will go first!" [player1] [player2] [random]
// "CLICK" - start round (player info from fields added to player objects & game board generated)

// player 1 place mark
// player 2 place mark
//    if row > "congratulations 'winner' you won!"
//    if board Full && no row > "it's a draw!"
// reset button (keeps names and marks)








GameInit.showPlayers();
// GameInit.placeMark();
// GameInit.logBoard();

