const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const canvasWidth = canvas.width;
const canvasHeight = canvas.height;

// Game state variables
let gameState = 'start'; // 'start', 'playing', or 'gameover'

// Dinosaur variables
let dinoX = 50;
let dinoY = canvasHeight - 100;
let dinoWidth = 50;
let dinoHeight = 50;
let jumping = false;
let jumpHeight = 150;
let jumpCount = 0;

// Obstacle variables
let obstacleX = canvasWidth;
let obstacleY = canvasHeight - 100;
let obstacleWidth = 20;
let obstacleHeight = 50;
let obstacleSpeed = 5;

// Event listener for jumping
document.addEventListener('keydown', handleKeyPress);
canvas.addEventListener('click', handleKeyPress);

function handleKeyPress(event) {
  if (event.code === 'Space' || event.code === 'Spacebar') {
    if (gameState === 'start') {
      gameState = 'playing';
    } else if (gameState === 'gameover') {
      // Reset the game and start playing again
      resetGame();
      gameState = 'playing';
    } else if (!jumping && gameState === 'playing') {
      jumping = true;
      jumpCount = 0;
    }
  }
}

function resetGame() {
  dinoY = canvasHeight - 100;
  obstacleX = canvasWidth;
  jumping = false;
}

function update() {
  if (gameState === 'playing') {
    // Update the game state
    if (jumping) {
      // Simulate the jump by changing the dinosaur's Y position
      dinoY -= 7;
      jumpCount += 7;
      if (jumpCount >= jumpHeight) {
        jumping = false;
      }
    } else {
      // Gravity simulation
      if (dinoY < canvasHeight - dinoHeight) {
        dinoY += 5;
      }
    }

    // Move the obstacle
    obstacleX -= obstacleSpeed;

    // Check for collision
    if (
      dinoX + dinoWidth > obstacleX &&
      dinoX < obstacleX + obstacleWidth &&
      dinoY + dinoHeight > obstacleY
    ) {
      // Collision detected, game over
      gameState = 'gameover';
    }

    // Reset obstacle position if it goes off the screen
    if (obstacleX + obstacleWidth < 0) {
      obstacleX = canvasWidth;
    }
  }
}

function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  if (gameState === 'start') {
    // Draw the start screen
    ctx.fillStyle = 'black';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Press Spacebar to Start', canvasWidth / 2, canvasHeight / 2);
  } else if (gameState === 'playing') {
    // Draw the playing state
    // Draw the dinosaur
    ctx.fillStyle = 'black';
    ctx.fillRect(dinoX, dinoY, dinoWidth, dinoHeight);

    // Draw the obstacle
    ctx.fillStyle = 'red';
    ctx.fillRect(obstacleX, obstacleY, obstacleWidth, obstacleHeight);
  } else if (gameState === 'gameover') {
    // Draw the game over screen
    ctx.fillStyle = 'black';
    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvasWidth / 2, canvasHeight / 2);
    ctx.fillText('Press Spacebar to Replay', canvasWidth / 2, canvasHeight / 2 + 30);
  }
}

// Start the game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

gameLoop();
