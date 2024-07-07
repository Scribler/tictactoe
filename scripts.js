// Assignment Instructions

// Objects
//  - gameBoard
//  - players
//  - game flow

console.log("hello world");

// game board

const gameInit = (function(){
  // Variables
  const gameBoard = [];
  const rows = 3;
  const columns = 3;
  const [player1, player2] = playerSetup();
  
  function playerSetup() {
    let playerOneDefaultOrder = 0;
    let playerTwoDefaultOrder = 1;
    const player1 = {
      // **[IMPORTANT]** Name and mark need to be sanitised
      //
      // name: prompt("Player 1, what is your name?"),
      // mark: prompt("Player 1, what is your mark?"),
      name: "Bob", // temp name
      mark: "X",   // temp mark
      identifier: 1,
      playOrder: playerOneDefaultOrder,
    }
    const player2 = {
      // **[IMPORTANT]** Name and mark need to be sanitised
      //
      // name: prompt("Player 2, what is your name?"),
      // mark: prompt("Player 2, what is your mark?"),
      name: "James", // temp name
      mark: "O",     // temp mark
      identifier: 2,
      playOrder: playerTwoDefaultOrder,
    }
    return [player1, player2];
  }

  function showPlayers() {
    console.log(player1);
    console.log(player2);
  }


  

  // Setting up game board START
  //
  for (let i = 0; i < rows; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < columns; j++) {
      gameBoard[i][j] = 0;
    }
  }
  //
  // Setting up game board END


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

gameInit.showPlayers();
// gameInit.placeMark();
// gameInit.logBoard();

