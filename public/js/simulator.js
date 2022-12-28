import insertGrid, {onClickBlockPaint} from "./grid.js";
import onClickStartButton from "./generation.js";


$(document).ready(function () {

  // on selecting dimension, insert grid and event listeners
  $("#select-dimension").on("change", function () {
    // grid
    let dimension = insertGrid();
    
    // event listeners
    onClickBlockPaint();
    onClickStartButton(dimension);
  });

});
