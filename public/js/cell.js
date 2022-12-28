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
  
  export default countLiveNeighbors;
  export {determineCellValue}