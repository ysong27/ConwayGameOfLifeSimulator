import insertGrid from "./grid.js";


$(document).ready(function () {

  // on selecting dimension, insert grid and event listeners
  $("#select-dimension").on("change", function () {
    // grid
    insertGrid();
    
    // event listeners
    onClickBlockPaint();
    onClickStartButton(dimension);
  });

});


function countLiveNeighbors(rowCoord, colCoord, matrix) {
  let liveNeighborCount = 0;
  let rowSize = matrix.length;
  let colSize = matrix[0].length;
  for (let i = rowCoord - 1; i <= rowCoord + 1; i++) {
    for (let j = colCoord - 1; j <= colCoord + 1; j++) {
      if (!(i == rowCoord && j == colCoord) && (i >= 0 && i < rowSize) && (j >= 0 && j < colSize)) {
        if (matrix[i][j] == 1) {
          liveNeighborCount++;
        }
      }
    }
  }
  return liveNeighborCount;
}

function determineCellValue(prevGenCellValue, liveNeighborCount) {
  let nextGenCellValue;
  if (prevGenCellValue == 1) {
    if (liveNeighborCount < 2) {
      nextGenCellValue = 0;
    } else if (liveNeighborCount >= 2 && liveNeighborCount <= 3) {
      nextGenCellValue = 1;
    } else {
      nextGenCellValue = 0;
    }
  } else {
    if (liveNeighborCount == 3) {
      nextGenCellValue = 1;
    } else {
      nextGenCellValue = 0;
    }
  }
  return nextGenCellValue;
}

function singleGeneration(prevGenMatrix) {
  var newGenMatrix = [];
  for (let i = 0; i < prevGenMatrix.length; i++) {
    newGenMatrix.push(new Array(prevGenMatrix[i].length));
  }
  for (let i = 0; i < prevGenMatrix.length; i++) {
    for (let j = 0; j < prevGenMatrix[i].length; j++) {
      let liveNeighbors = countLiveNeighbors(i, j, prevGenMatrix);
      newGenMatrix[i][j] = determineCellValue(prevGenMatrix[i][j], liveNeighbors);
    }
  }
  return newGenMatrix;
}

function displayGenerationMatrix(matrix) {
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] == 1) {
        $(`#r${i}c${j}`).css("background-color", "black");
      } else {
        $(`#r${i}c${j}`).css("background-color", "white");
      }
    }
  }
}



function startGenerations(matrix) {
  var generatonIntervalId = setInterval(function () {
    let newMatrix = singleGeneration(matrix);
    displayGenerationMatrix(newMatrix);
    matrix = newMatrix;
  }, 1200);

  onClickStopButton(generatonIntervalId);
  onClickClearButton(generatonIntervalId);
}

function getInitialUserMatrix(dimension) {
  let initialUserMatrix = [];
  for (let i = 0; i < dimension; i++) {
    initialUserMatrix.push(new Array(dimension));
  }
  for (let i = 0; i < dimension; i++) {
    for (let j = 0; j < dimension; j++) {
      let backgroundColor = $(`#r${i}c${j}`).css("background-color");
      if (backgroundColor == "rgb(0, 0, 0)") {
        initialUserMatrix[i][j] = 1;
      } else {
        initialUserMatrix[i][j] = 0;
      }
    }
  }
  return initialUserMatrix;
}



function onClickBlockPaint() {
  $(".block").on("click", function () {
    if ($(this).css("background-color") != "rgb(0, 0, 0)") {
      $(this).css("background-color", "black");
    } else {
      $(this).css("background-color", "white");
    }
  });
}
function onClickStartButton(dimension) {
  $("#startButton").on("click", function () {
    let matrix = getInitialUserMatrix(dimension);
    displayGenerationMatrix(matrix);
    startGenerations(matrix);
  });
}

function onClickStopButton(generatonIntervalId) {
  $("#stopButton").on("click", function () {
    clearInterval(generatonIntervalId);
  });
}

function onClickClearButton(generatonIntervalId) {
  $("#clearButton").on("click", function () {
    clearInterval(generatonIntervalId);
    $(".block").css("background-color", "white");
  });
}