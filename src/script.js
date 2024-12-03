// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const highestContainer = document.querySelector(".highestContainer");

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let direction = "right";
let highScore = 0;
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

// Draw game map, snake, food
function draw() {
  board.innerHTML = "";
  drawSnake();
  drawFood();
  updateScore();
}

// Draw snake
function drawSnake() {
  let i = 0;
  snake.forEach((segment) => {
    if (i === 0) {
      const snakeHead = createGameElement("div", "snake");
      setPosition(snakeHead, segment);
      board.appendChild(snakeHead);
      snakeHead.style.backgroundColor = "#7d8796";
    } else {
      const snakeElement = createGameElement("div", "snake");
      setPosition(snakeElement, segment);
      board.appendChild(snakeElement);
    }
    i++;
  });
}

// Draw food function
function drawFood() {
  const foodElement = createGameElement("div", "food");
  setPosition(foodElement, food);
  board.appendChild(foodElement);
}

// Create a snake or food cube/div
function createGameElement(tag, className) {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

// Set the position of the snake or food
function setPosition(element, position) {
  element.style.gridColumn = position.x;
  element.style.gridRow = position.y;
}

// Generate food
function generateFood() {
  while (true) {
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    if (!checkFoodOnSnake(x, y)) {
      return { x, y };
    }
  }
}

// Check if generatedFood is on the snake's body
function checkFoodOnSnake(x, y) {
  let result = false;
  snake.forEach((segment) => {
    if (segment.x == x && segment.y == y) result = true;
  });
  return result;
}

// Moving the snake
function move() {
  const head = { ...snake[0] };
  switch (direction) {
    case "up":
      head.y--;
      break;
    case "down":
      head.y++;
      break;
    case "left":
      head.x--;
      break;
    case "right":
      head.x++;
      break;
  }

  snake.unshift(head);

  // When the snake eats, the game updates the following
  if (head.x === food.x && head.y === food.y) {
    increaseSpeed();
    food = generateFood();
    clearInterval(gameInterval); // Clear past interval
    gameInterval = setInterval(() => {
      move();
      checkCollision();
      draw();
    }, gameSpeedDelay);
  } else {
    snake.pop();
  }
}

// Increasing the speed function
function increaseSpeed() {
  console.log(gameSpeedDelay);
  if (gameSpeedDelay > 150) {
    gameSpeedDelay -= 5;
  } else if (gameSpeedDelay > 120) {
    gameSpeedDelay -= 3;
  } else if (gameSpeedDelay > 90) {
    gameSpeedDelay -= 1;
  }
}

// Checking collision
function checkCollision() {
  const head = snake[0];

  if (head.x < 1 || head.x > gridSize || head.y < 1 || head.y > gridSize) {
    resetGame();
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      resetGame();
    }
  }
}

// Start game function
function startGame() {
  gameStarted = true; // Keep track of a running game
  instructionText.style.display = "none";
  gameInterval = setInterval(() => {
    move();
    checkCollision();
    draw();
  }, gameSpeedDelay);
}

// Key press event listener
function handleKeyPress(event) {
  if ((!gameStarted && event.code === "Space") || (!gameStarted && event.key === " ")) {
    startGame();
  } else {
    switch (event.key) {
      case "ArrowUp":
        if (direction !== "down") direction = "up";
        break;
      case "ArrowDown":
        if (direction !== "up") direction = "down";
        break;
      case "ArrowLeft":
        if (direction !== "right") direction = "left";
        break;
      case "ArrowRight":
        if (direction !== "left") direction = "right";
        break;
    }
  }
}

document.addEventListener("keydown", handleKeyPress);

function resetGame() {
  updateHighScore();
  stopGame();
  snake = [{ x: 10, y: 10 }];
  food = generateFood();
  direction = "right";
  gameSpeedDelay = 200;
  updateScore();
}

function updateScore() {
  const currentScore = snake.length - 1;
  score.textContent = currentScore.toString().padStart(3, "0");
}

function stopGame() {
  clearInterval(gameInterval);
  gameStarted = false;
  instructionText.style.display = "block";
}

function updateHighScore() {
  const currentScore = snake.length - 1;
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreText.textContent = highScore.toString().padStart(3, "0");
  }
  highestContainer.style.display = "block";
}
