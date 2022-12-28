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
  }
  
  
  export default insertGrid;