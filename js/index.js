const img = "../images/road.png";
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const roadImg = new Image();
roadImg.src = "./images/road.png";

const car = new Image();
car.src = "./images/car.png";
// if we use the () =>, the this keyword only accesses whatever is inside that specific function
// object way because we only have one of them.
// draw() same as draw: function(){}
// make properties then use the this keyword to update them but also dont forget that the this keyword doesnt work on a ()=> function
const player = {
  x: canvas.width / 2,
  y: canvas.height - 100,
  draw() {
    ctx.drawImage(car, this.x, this.y, 50, 100);
  },
  moveLeft() {
    this.x = this.x - 5;
  },
  moveRight() {
    this.x = this.x + 5;
  },
  moveUp() {
    this.y = this.y - 5;
  },
  moveDown() {
    this.y = this.y + 5;
  },
};

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {
    ctx.drawImage(roadImg, 0, 0, 500, 700);
    player.draw();
  }
};
function updateCanvas() {
  ctx.clearRect(0, 0, 500, 700);

  ctx.drawImage(roadImg, 0, 0, 500, 700);
  player.draw();
}

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
  updateCanvas();
});
