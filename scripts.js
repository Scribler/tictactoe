//
// ** GAME BOARD START **
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
// ** GAME BOARD END **
//


//
// ** PLAYERS START ** 
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
// ** PLAYERS END ** 
//
//


//
// ** DISPLAY START ** 
//
const display = (function (){ // display the current state of the game
  // Getting game area
  const gameArea = document.querySelector('.gameArea'); // Framed area
  // Creating game elements
      // text area
  const gameFlow = document.createElement('div'); // Instructions
  const gameFlowText = document.createElement('p'); // Instructions
  const playerNameBox = document.createElement('input'); // Name
  const playerMarkDiv = document.createElement('div'); // Player mark button container
        // mark radio button components.

  // new stuff start

  const submitButton = document.createElement('button');
      // board
  const gameBoard = document.createElement('div'); // Game Board
  const gameCell = document.createElement('div'); // GameBoardCell
  const mark = document.createElement('div'); // mark
  // adding styles
  gameFlow.classList.add('gameFlow');
  gameFlowText.classList.add('gameFlowText');
  gameBoard.classList.add('gameBoard');
  submitButton.classList.add('submitButton');
  // adding content
  gameFlowText.innerHTML = "Player ##, enter your name."; // changeable
  submitButton.textContent = "Submit";
  gameBoard.textContent = "b";
  // assembly
      // gameFlow
  gameFlow.appendChild(gameFlowText);
  gameFlow.appendChild(playerNameBox);
  gameFlow.appendChild(submitButton);

  function addTextArea(){ // add text area to DOM
    gameArea.appendChild(gameFlow);
    return "Text Area added";
  }
  function addGameBoard(){ // add game board to DOM
    gameArea.appendChild(gameBoard);
    return "Gameboard added";
  }
  
  // new stuff end

  // const [player1, player2] = players(); // GET "player1" and "player2"
  // const gameDisplay = document.getElementById('gameArea'); // need another div layer here.  The cells are interfering with the intro text.
  // gameDisplay.setAttribute('id', 'gameArea');
  //
  // const gameBoard = document.createElement('div');
  // gameBoard.setAttribute('id', 'gameBoard');
  // gameBoard.innerHTML = "";
  // const gameFlowText = document.createElement("h3");
  // gameFlowText.classList.add('gameFlowText');
  // // gameFlowText.innerText = flowText; // production
  // gameFlowText.innerText = "PlaceHolderText"; // testing only
  // for (let i = 0; i < 9; i++) {
  //   // making the physical elements
  //   const gameCell= document.createElement('div');
  //   const mark = document.createElement('div');
  //   gameCell.classList.add('gameCell');
  //   mark.classList.add('mark')
  //   mark.setAttribute('id', `mark${i}`);
  //
  //   // setting the inner value for each block
  //   let blockText = "";
  //   if (player1.playedCells.includes(i.toString())) {
  //     blockText = player1.mark;
  //   } else if (player2.playedCells.includes(i.toString())) {
  //     blockText = player2.mark;
  //   } else {
  //     blockText = "";
  //   }
  //   mark.innerText = blockText;
  //
  //   // putting the pieces together
  //   gameCell.appendChild(mark);
  //   gameBoard.appendChild(gameCell);
  //   gameDisplay.appendChild(gameFlowText);
  //   gameDisplay.appendChild(gameBoard);
  // }
  console.log("display ran");
  return { addTextArea, addGameBoard };
})();

//
// ** DISPLAY END ** 
//
//


//
// ** GAME FLOW START** 
//
function game() {
  console.log("starting game");
  // load players
  const [player1, player2] = players(); // GET "player1" and "player2"
  player1.playedCells = []; // reset played cells
  player2.playedCells = []; // reset played cells
  GameBoard.createGameBoard(); // creat/reset game board
  // let currentPlayer = ""; // production
  let currentPlayer = "0"; // testing
  
  function getFirstPlayer() { // who's turn to start
    // currentPlayer = prompt("Who wants to go first? Enter 1 for player1, Enter 2 for player2, Leave blank for random.");
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
// ** GAME FLOW END ** 
//



//
// RUN GAME
//
// game();
display.addTextArea();
display.addGameBoard();





