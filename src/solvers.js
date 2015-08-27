/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var solution = undefined; 
  var board = new  Board({n : n});
  var solutionFound = false;

  var findSolution = function(currentRow) {
    if (currentRow === n) {
      solution = board.rows();
      solutionFound = true;
      return;
    }
    for (var i = 0; i < n; i++) {

      board.togglePiece(currentRow, i);
      if (!board.hasAnyRooksConflicts()) {
        findSolution(currentRow + 1);
        if (findSolution) {
          return;
        }
      }
      board.togglePiece(currentRow, i);
    }
  }
  findSolution(0);
  //return a matrix
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var occupiedCols = [];
  var countSolutions = function(currentRow) {
    if (currentRow === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      if (occupiedCols.indexOf(i) > -1) {
        continue;
      }
      board.togglePiece(currentRow, i);
      if (!board.hasAnyRooksConflicts()) {
        occupiedCols.push(i);
        countSolutions(currentRow + 1);       
      }
      board.togglePiece(currentRow, i);
      occupiedCols.pop();
    }
  };
  countSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; 
  var board = new  Board({n : n});
  var solutionFound = false;
  
  var findSolution = function(currentRow) {
    //base case
    if (currentRow === n) {
      solution = board.rows();
      solutionFound = true;
      return;
    } 
    for (var i = 0; i < n; i++) {
      board.togglePiece(currentRow, i);
      if (!board.hasAnyQueensConflicts()) {
        findSolution(currentRow + 1);
        if (solutionFound) {
          return;
        }
      }
      board.togglePiece(currentRow, i);
    }
  };  
  findSolution(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution === undefined ? board.rows() : solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});
  var occupiedCols = [];
  function countSolutions(currentRow) {
    if (currentRow === n) {
      solutionCount++;
      return;
    }
    for (var i = 0; i < n; i++) {
      if ((occupiedCols.indexOf(i) > -1)) {  
        continue;
      }
      board.togglePiece(currentRow, i);
      if (!board.hasAnyQueensConflicts()) {
        occupiedCols.push(i);
        countSolutions(currentRow + 1);
      }
      board.togglePiece(currentRow, i);
      occupiedCols.pop();
    }
  };
  countSolutions(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
