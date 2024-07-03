//
// players(2)
//
const player1  = {
  name: "player1",
  mark: "X",
}

const player2  = {
  name: "player2",
  mark: "O",
}


//
// gameboard
//
const Gameboard = (() => {
  const gameBoardArray = [];
  
  for (let i = 0; i < 3; i++) { // build 3 'columns' of 3 within the gameboard array
    gameBoardArray.push(["","",""]);
  }

  //
  // See if you can move the below actons outside of the module
  //

  gameBoardArray[1][2] = player2.mark; // test marks
  gameBoardArray[1][0] = player1.mark; // test marks
  console.log(gameBoardArray); // test log
  
})();




//
// game flow / logic / win determination
//




//
// display controller
//




