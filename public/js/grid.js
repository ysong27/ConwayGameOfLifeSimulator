function createGrid(dimension) {
    let grid = `<div class="grid">`;
    for (let i = 0; i < dimension; i++) {
      grid += `<div class="grid-row">`;
      for (let j = 0; j < dimension; j++) {
        grid += `<div class="block" id=r${i}c${j}></div>`;
      }
      grid += "</div>";
    }
    grid += "</div>";
    return grid;
  }

  function insertGrid() {
    let dimension = $("#select-dimension").val();
    var grid = createGrid(dimension, dimension);
    $("#grid-container").html(grid);    
    return dimension;
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
  
  
  
  export default insertGrid;
  export {onClickBlockPaint}