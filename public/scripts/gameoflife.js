let gridDiv = document.getElementById("conwayGrid");
let cellArray = generateObjectArraySquareGrid(20);
let tick;

function setupButtons() {
  document.getElementById("step").addEventListener("click", () => {
    step()
  });

  document.getElementById("start").addEventListener("click", () => {
    if (!tick) {
      tick = setInterval(() => {step()}, 1000);
    }
  });

  document.getElementById("stop").addEventListener("click", () => {
    clearInterval(tick);
    tick = null;
  });

  document.getElementById("clear").addEventListener("click", () => {
    cellArray.forEach(cell => {
      cell.isDying = true;
      cell.isBirthing = false;
    });
    updateCellView();
  });  
}

function step() {
  console.time();
  updateCellModel();
  updateCellView();
  console.timeEnd();  
}

function generateObjectArraySquareGrid(sideLenghth) {
  objArr = [];
  for (let x = 0; x < sideLenghth; x++) {
    for (let y = 0; y < sideLenghth; y++) {
      objArr.push( {"x": x, "y": y, isAlive: false, isDying: false, isBirthing: false} );
    }
  }
  return objArr;
}

function drawGrid (arr, grid) {
  let max = arr[arr.length - 1];
  let index = 0;
  for (let y = 0; y <= max.y; y++) {
    let rowDiv = document.createElement("div");
    rowDiv.setAttribute("id",`row_${y}`);
    grid.appendChild(rowDiv);
    for (let x = 0; x <= max.x; x++) {
      let input = document.createElement("input");
      input.setAttribute("type","checkbox");
      input.setAttribute("class","cell");
      input.setAttribute("id", index);
      input.addEventListener("change", (e) => {
        changeAliveState(e.srcElement.id);
      });
      rowDiv.appendChild(input);
      index++;
    }
  }
}

function changeAliveState(id) {
  let index = Number.parseInt(id);
  cellArray[index].isAlive = !cellArray[index].isAlive;
//   console.log(`Cell ${id} isAlive: ${cellArray[index].isAlive}`);
}

function compareCellState(cell1, cell2) {
  let result = true;
  let props = Object.getOwnPropertyNames(cell1);
  props.forEach(prop => {
    if(cell1[prop] !== cell2[prop]) {
      result = false;
    }
  });
  return result;
}

function getCellNeighbors(cell) {
  let possibleNeigbors = [
    { x: cell.x + 1, y: cell.y, isAlive: true },
    { x: cell.x - 1, y: cell.y, isAlive: true },
    { x: cell.x, y: cell.y + 1, isAlive: true },
    { x: cell.x, y: cell.y - 1, isAlive: true },
    { x: cell.x + 1, y: cell.y + 1, isAlive: true },
    { x: cell.x + 1, y: cell.y - 1, isAlive: true },
    { x: cell.x - 1, y: cell.y + 1, isAlive: true },
    { x: cell.x - 1, y: cell.y - 1, isAlive: true }
  ];
  let realLiveNeighbors = [];
  possibleNeigbors.forEach(possibleNeigbor => {
    cellArray.forEach(cell => {
      if(compareCellState(possibleNeigbor, cell)) {
        realLiveNeighbors.push(cell);
      }
    });
  });
  return realLiveNeighbors;
}

function updateCellModel() {
  cellArray.forEach((cell) => {
    let neighborQuantity = getCellNeighbors(cell).length;
    if(neighborQuantity < 2 && cell.isAlive)
      cell.isDying = true;
    else if(neighborQuantity === 3 && cell.isAlive)
      cell.isDying = false;
    else if(neighborQuantity > 3 && cell.isAlive)
      cell.isDying = true;
    else if(neighborQuantity === 3 && !cell.isAlive)
      cell.isBirthing = true;
  });
}

function updateCellView() {
  for (let index = 0; index < cellArray.length; index++) {
    let cell = cellArray[index];
    let cellElement = document.getElementById(index);
    if(cell.isDying) {
      cell.isDying = false;
      cell.isBirthing = false;
      cell.isAlive = false;
      cellElement.checked = false;
    } else if(cell.isBirthing) {
      cell.isDying = false;
      cell.isBirthing = false;
      cell.isAlive = true;
      cellElement.checked = true;
    }
  }
}

drawGrid(cellArray, gridDiv);
setupButtons();