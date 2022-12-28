import insertGrid, {onClickBlockPaint} from "./grid.js";
import onClickStartButton from "./generation.js";


$(document).ready(function () {

  // hide pause and clear buttons initially
  $("#startButton").hide();
  $("#pauseButton").hide();
  $("#clearButton").hide();



  // on selecting dimension, insert grid and event listeners
  $("#select-dimension").on("change", function () {
    let dimension = insertGrid();

    $("#startButton").show();
    $("#pauseButton").hide();
    $("#clearButton").hide();

    onClickBlockPaint();
    onClickStartButton(dimension);
  });

});
