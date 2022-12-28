import countLiveNeighbors, {determineCellValue} from "./cell.js";

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
  
function startGenerations(matrix) {
  var generatonIntervalId = setInterval(function () {
    let newMatrix = singleGeneration(matrix);
    displayGenerationMatrix(newMatrix);
    matrix = newMatrix;
  }, 1200);

  onClickPauseButton(generatonIntervalId);
  onClickClearButton(generatonIntervalId);
}
  


function onClickStartButton(dimension) {
    $("#startButton").on("click", function () {
      let matrix = getInitialUserMatrix(dimension);
      displayGenerationMatrix(matrix);
      startGenerations(matrix);

      // show pause button only
      $("#startButton").hide();
      $("#pauseButton").show();
      $("#clearButton").hide();

      $("#select-dimension").attr("disabled", "disabled");
    });
  }
  
  function onClickPauseButton(generatonIntervalId) {
    $("#pauseButton").on("click", function () {
      clearInterval(generatonIntervalId);

      // hide pause button only
      $("#startButton").show();
      $("#pauseButton").hide();
      $("#clearButton").show();
    });
  }
  
  function onClickClearButton(generatonIntervalId) {
    $("#clearButton").on("click", function () {
      clearInterval(generatonIntervalId);
      $(".block").css("background-color", "white");

      // show start button only
      $("startButton").show();
      $("#pauseButton").hide();
      $("#clearButton").hide();

      $("#select-dimension").removeAttr("disabled");
    });
  }

  export default onClickStartButton;