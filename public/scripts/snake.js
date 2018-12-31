const updateTime = 100;
const div = document.getElementById("direction");
const canvas = document.getElementById("snakeCanvas");
canvas.width = "500";
canvas.height = "500";
const ctx = canvas.getContext("2d");
let snakeBody = [
  { x: 10, y: 10 },
  { x: 10, y: 20 },
  { x: 10, y: 30 },
  { x: 10, y: 40 }
];
let currentDirection = "right";

function clearCanvas() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnakeBodySegment(coordinates) {
  ctx.strokeStyle = "yellow";
  ctx.fillStyle = "green";
  ctx.strokeRect(coordinates.x, coordinates.y, 10, 10);
  ctx.fillRect(coordinates.x, coordinates.y, 10, 10);
}

function drawSnakeBody() {
  snakeBody.forEach(coordinate => {
    drawSnakeBodySegment(coordinate);
  });  
}

function moveSnakeBody() {
  let newSnakeHead = Object.assign({}, snakeBody[0]);
  switch (currentDirection) {
    case "up":
      newSnakeHead.y -= 10;
      break;
    case "right":
      newSnakeHead.x += 10;
      break;
    case "down":
      newSnakeHead.y += 10;
      break;
    case "left":
      newSnakeHead.x -= 10;
      break;
  }
  snakeBody.unshift(newSnakeHead);
  snakeBody.pop();
}

function start() {
  clearCanvas();
  drawSnakeBody();
  setInterval(() => {
    div.innerHTML = currentDirection;
    clearCanvas();
    moveSnakeBody();
    drawSnakeBody();
  }, updateTime);
}

start();



