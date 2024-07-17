//
// ** GAME BOARD **
//
const GameBoard = (function(){
  // Variables
  let board = [];
  const rows = 3;
  const columns = 3;
  const [player1, player2] = players(); // assign the returned players to usable variables
  // Setting up game board START
  function boardReset() {
    board = [];
  }
  function createGameBoard() {
    boardReset();
    for (let i = 0; i < rows; i++) { 
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i][j] = {
          cellName: i*3+j, // create cells from 0 - 8
          marker: 0,
        }
      }
    }
  }
  // place mark on board (and check if location already occupied)
  function placeMark(player) { 
    let [firstCoordinate, secondCoordinate] = prompt(`${player.name}, Where would you like to place your mark?`).split("");
    if (board[firstCoordinate][secondCoordinate].marker === 0) {
      board[firstCoordinate][secondCoordinate].marker = player.mark; // temp
      player.playedCells.push((board[firstCoordinate][secondCoordinate]).cellName)
      console.log(player.playedCells);
    } else {
      placeMark(player);
    }
  }
  
  // check for winning combinations and return false OR winning player
  function winCheck(player){
    const winCombinations = [ '012','345','678','036','147','258','048','246' ];
    playedCells = player.playedCells.join("");
    let winner = false;
    
    winCombinations.forEach(element => {
      winArr = element.split("");
      winRegExString = winArr.join("|");
      winRegEx = new RegExp(winRegExString, "g");
      const found = playedCells.match(winRegEx);
      if (found !== null && found.length === 3) {
        winner = player;
      }
    });
    return winner;
  }

  // show gameboard's current state in console
  function logBoard() { // log the game board readably
    for (let i = 0; i < board.length; i++) {
      const row = board[i]; // store rows
      console.log(row);     // print rows
    }
  }
  return { placeMark, logBoard, winCheck, createGameBoard};
})();

//

//

//
// ** PLAYERS ** 
//
function players() { // collect player info and return array of players     **inputs need to be sanitised**
  // player one
  const player1 = {
    name: "Player 1", // temp name
    mark: "X",   // temp mark
    identifier: 1,
    playedCells: [],
    // playedCells: ['4', '5', '6', '7'], // testing array
  }
  // player two
  const player2 = {
    name: "Player 2", // temp name
    mark: "O",     // temp mark
    identifier: 2,
    playedCells: [],
    // playedCells: [, '2', '3', '8', '0'], // testing array
  }
  return [player1, player2];
}

//

//

//
// ** DISPLAY ** 
//
function display(){
  const [player1, player2] = players(); // GET "player1" and "player2"
  const gameDisplay = document.getElementById('gameBoard');
  // gameBoard.innerHTML = "";
  for (let i = 0; i < 9; i++) {
    // making the physical elements
    const gameBox = document.createElement('div');
    const mark = document.createElement('div');
    gameBox.classList.add('gameBox');
    mark.classList.add('mark')
    mark.setAttribute('id', `mark${i}`);

    // setting the inner value for each block
    let blockText = "";
    if (player1.playedCells.includes(i.toString())) {
      blockText = player1.mark;
    } else if (player2.playedCells.includes(i.toString())) {
      blockText = player2.mark;
    } else {
      blockText = "";
    }
    mark.innerText = blockText;

    // putting the pieces together
    gameBox.appendChild(mark);
    gameDisplay.appendChild(gameBox);
  }
  console.log("display ran");
}

//

//

//
// ** GAME FLOW ** 
//
function game() {
  console.log("starting game");
  // load players
  const [player1, player2] = players(); // GET "player1" and "player2"
  player1.playedCells = []; // reset played cells
  player2.playedCells = []; // reset played cells
  GameBoard.createGameBoard(); // creat/reset game board
  let currentPlayer = "";
  
  function getFirstPlayer() { // who's turn to start
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
      if(GameBoard.winCheck(currentPlayer)) {
        console.log(`${currentPlayer.name} is the winner!`);
        const playAgain = prompt("Would you like to play again? (y)? or (n)?");
        if (playAgain === "y") {
          game()
        } else {
          break;
        }
        break;
      };
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
  // game flow
  getFirstPlayer();
  playRound();
}



//
// RUN GAME
//
display();
game()












