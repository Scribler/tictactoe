//
// players(2)
//
const player1  = {
  name: "player1",
  mark: "X",
  tempMark: 1,
}

const player2  = {
  name: "player2",
  mark: "0",
  tempMark: 2,
}


//
// gameboard
//
const Gameboard = (() => {
  const gameBoardArray = [];
  
  for (let i = 0; i < 3; i++) { // build 3 'columns' of 3 within the gameboard array
    gameBoardArray.push([0,0,0]);
  }

  //
  // See if you can move the below actons outside of the module
  //

  gameBoardArray[1][2] = player2.tempMark; // test marks
  gameBoardArray[1][0] = player1.tempMark; // test marks
  console.log(gameBoardArray); // test log
  
})();




//
// game flow / logic / win determination
//




//
// display controller
//


//
//
//
//
// Required Functionality
//
//  >> Choose your MARK
//  >> Choose your PLAYER NAME
//  >> Who starts? > random



