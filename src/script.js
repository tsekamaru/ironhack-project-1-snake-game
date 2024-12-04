// Define HTML elements
const board = document.getElementById("game-board");
const instructionText = document.getElementById("instruction-text");
const logo = document.getElementById("logo");
const score = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const highestContainer = document.querySelector(".highestContainer");
const speed = document.querySelector(".speed");
const mySound = new Audio("/assets/Mezhdunami - Flashes.mp3");
const eatSound = new Audio("/assets/mixkit-bonus-earned-in-video-game-2058.wav");

// Define game variables
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
let randomColor = randomHue();
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
  colorFood(foodElement);
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
// Generate color function
function colorFood(foodElement) {
  foodElement.style.backgroundColor = `hsl(${randomColor}, 71%, 50%)`;
  foodElement.style.boxShadow = `0 0 25px hsl(${randomColor}, 71%, 50%), 0 0 75px hsl(${randomColor}, 71%, 50%)`;
}

function randomHue() {
  return Math.floor(Math.random() * 360);
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
    eatSound.pause();
    eatSound.play();
    increaseSpeed();
    food = generateFood();
    randomColor = randomHue();
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
  if (gameSpeedDelay > 100) {
    gameSpeedDelay -= 10;
  } else if (gameSpeedDelay > 50) {
    gameSpeedDelay -= 5;
  }
  let gameSpeed = (1000 / gameSpeedDelay).toFixed(1);
  speed.innerText = `speed ${gameSpeed} sqr/s`;
}

// Checking collision
function checkCollision() {
  const head = snake[0];

  // Make wall penetrable
  if (head.x < 1) {
    head.x = 20;
  } else if (head.x > gridSize) {
    head.x = 1;
  } else if (head.y < 1) {
    head.y = 20;
  } else if (head.y > gridSize) {
    head.y = 1;
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
  randomColor = randomHue();
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
