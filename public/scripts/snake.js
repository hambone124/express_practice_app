const updateTime = 50;
const statusElement = document.getElementById("status");
const scoreElement = document.getElementById("score");
const highScoreElement = document.getElementById("highScore");
const canvas = document.getElementById("snakeCanvas");
canvas.width = "500";
canvas.height = "500";
const ctx = canvas.getContext("2d");
let tick;
let score = 0;
let highScore = 0;
const initSnake = [
  { x: 10, y: 10 },
  { x: 10, y: 20 },
  { x: 10, y: 30 },
  { x: 10, y: 40 }
];
let snakeBody = Array.from(initSnake);
let currentDirection = "right";
let moveLock = false;
let isFoodPresent = false;
let foodCoordinate;
let gameOver = false;

document.addEventListener("keydown", e => {
  if (!moveLock) {
    if ((e.key === "ArrowUp" || e.key === "w") && currentDirection !== "down") { 
      currentDirection = "up";
    }
    else if ((e.key === "ArrowLeft" || e.key === "a") && currentDirection !== "right") { 
      currentDirection = "left";
    }
    else if ((e.key === "ArrowDown" || e.key === "s") && currentDirection !== "up") { 
      currentDirection = "down";
    }
    else if ((e.key === "ArrowRight" || e.key === "d") && currentDirection !== "left") { 
      currentDirection = "right";
    }
    moveLock = true;
  }
  if (e.key === "r")
    restartGame();
});

function restartGame() {
  if (gameOver) {
    statusElement.innerHTML = "Use WASD or arrow keys to move";
    gameOver = false;
    score = 0;
    snakeBody = Array.from(initSnake);
    currentDirection = "right";
    start();
  }
}

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

function checkEndGame() {
  let snakeHead = snakeBody[0];
  for (let i = 3; i < snakeBody.length; i++) {
    if (snakeBody[i].x === snakeHead.x && snakeBody[i].y === snakeHead.y) {
      gameOver = true;
      statusElement.innerHTML = "Game Over. Press R to restart.";
      if (score > highScore)
        highScore = score;
      highScoreElement.innerHTML = highScore;
    }
  }
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
  
  if (newSnakeHead.x > canvas.width) 
    newSnakeHead.x = 0;
  else if (newSnakeHead.x < 0) 
    newSnakeHead.x = canvas.width;
  else if (newSnakeHead.y > canvas.height) 
    newSnakeHead.y = 0;
  else if (newSnakeHead.y < 0) 
    newSnakeHead.y = canvas.height;
  
  snakeBody.unshift(newSnakeHead);
  if (newSnakeHead.x === foodCoordinate.x && newSnakeHead.y === foodCoordinate.y) {
    isFoodPresent = false;
    score++;
  }
  else
    snakeBody.pop();
}

function randomPoint() {
  let point = {}
  let randomX = Math.floor((Math.floor(Math.random() * canvas.width) / 10)) * 10;
  let randomY = Math.floor((Math.floor(Math.random() * canvas.height) / 10)) * 10;
  return { x: randomX, y: randomY };
}

function drawFood(coordinate) {
  ctx.strokeStyle = "red";
  ctx.fillStyle = "yellow";
  ctx.strokeRect(coordinate.x, coordinate.y, 10, 10);
  ctx.fillRect(coordinate.x, coordinate.y, 10, 10);
}

function updateFood() {
  if (!isFoodPresent) {
    foodCoordinate = randomPoint();
    isFoodPresent = true;
  }
  drawFood(foodCoordinate);
}

function start() {
  clearCanvas();
  drawSnakeBody();
  tick = setInterval(() => {
    scoreElement.innerHTML = score;
    clearCanvas();
    updateFood();
    moveSnakeBody();
    drawSnakeBody();
    checkEndGame(snakeBody[0]);
    moveLock = false;
    if (gameOver) {
      clearInterval(tick);
    }
  }, updateTime);
}

start();
