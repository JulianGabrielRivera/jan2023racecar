const img = "../images/road.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const roadImg = new Image();
roadImg.src = "./images/road.png";

const car = new Image();
car.src = "./images/car.png";
//  this is used for if statement so if this is false then we start game over else if true then it doesnt.
// when game starts it goes to true, then if game stops it goes false so we can click again for restart.
let gameOn = false;
function getRandomColor() {
  max = 1 << 24;
  return "#" + (max + Math.floor(Math.random() * max)).toString(16).slice(-6);
}
let point = 0;
// if we use the () =>, the this keyword only accesses whatever is inside that specific function
// object way because we only have one of them.
// draw() same as draw: function(){}
// make properties then use the this keyword to update them but also dont forget that the this keyword doesnt work on a ()=> function
const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  w: 50,
  h: 100,
  draw() {
    ctx.drawImage(car, this.x, this.y, this.w, this.h);
  },
  moveLeft() {
    this.x = this.x - 15;
  },
  moveRight() {
    this.x = this.x + 15;
  },
  moveUp() {
    this.y = this.y - 15;
  },
  moveDown() {
    this.y = this.y + 15;
  },
};

// we need a class for obstacles because we will have multiple obstacles

class Obstacle {
  constructor(color) {
    this.x = Math.floor(Math.random() * 600);
    this.y = 0;
    this.width = Math.floor(Math.random() * 50);
    this.height = Math.floor(Math.random() * 50);
    this.color = color;
  }
  newPos() {
    this.y = this.y + 15;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

let obstacleArray = [];
let obstacleId;
let animationId;
function startGame() {
  gameOn = true;
  ctx.drawImage(roadImg, 0, 0, 500, 700);
  player.draw();
  obstacleId = setInterval(() => {
    obstacleArray.push(new Obstacle(getRandomColor()));

    console.log(obstacleArray);
  }, 180);

  animation();
}
console.log(obstacleArray);
function stopGame() {
  gameOn = false;
  clearInterval(obstacleId);
  clearInterval(animationId);
  ctx.clearRect(0, 0, 500, 700);
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 500, 700);
  // gotta empty array as well to fully restart game
  obstacleArray = [];
  ctx.fillStyle = "white";
  ctx.font = "20px serif";
  ctx.fillText("Game Over", 100, 100);

  // if (point > 15) {
  //   ctx.fillStyle = "white";
  //   ctx.font = "24px serif";
  //   ctx.fillText("Game Over", 100, 100);
  // }
}
function animation() {
  animationId = setInterval(() => {
    updateCanvas();
  }, 32);
}
function showScore() {
  ctx.fillStyle = "green";
  ctx.fillRect(10, 10, 100, 100);
  ctx.fillStyle = "white";
  ctx.font = "18px serif";
  ctx.fillText(`Score: ${point}`, 30, 30);
  if (point > 15) {
    stopGame();
    ctx.fillStyle = "white";
    ctx.font = "40px serif";
    ctx.fillText(`You've won! ${point}`, 150, 200);
    point = 0;
  } else if (point === 30) {
    stopGame();
    ctx.fillStyle = "white";
    ctx.font = "40px serif";
    ctx.fillText(`You lose! ${point}`, 150, 200);
    // reset points to make restart work.
    point = 0;
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700);

  ctx.drawImage(roadImg, 0, 0, 500, 700);
  player.draw();
  for (let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].newPos();
    obstacleArray[i].draw();
    if (obstacleArray[i].y > canvas.height) {
      obstacleArray.splice(i, 1);
      console.log(obstacleArray);
      point = point + 1;
      console.log(point);
    } else if (
      player.x < obstacleArray[i].x + obstacleArray[i].width &&
      player.x + player.w > obstacleArray[i].x &&
      player.y < obstacleArray[i].y + obstacleArray[i].height &&
      player.h + player.y > obstacleArray[i].y
    ) {
      // Collision detected!
      stopGame();
      console.log("crash");
    }
  }
  showScore();

  // console.log(point);
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    if (gameOn === false) startGame();
  };

  document.addEventListener("keydown", (e) => {
    switch (e.keyCode) {
      case 38:
        player.moveUp();
        console.log("up", player);

        break;
      case 40:
        player.moveDown();
        console.log("down", player);
        break;
      case 37:
        player.moveLeft();
        console.log("left", player);
        break;
      case 39:
        player.moveRight();
        console.log("right", player);
        break;
    }
    // this function works for all these cause it triggers for all of them just on the bottom.
    // updateCanvas();
  });
};
