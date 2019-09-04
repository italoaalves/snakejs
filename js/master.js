class Snake {
  constructor(){
    this.x = 100;
    this.y = 80;
    this.sx = 10;
    this.sy = 0;
    this.color = "green";
    this.tail = [];
  }

  update(){
    this.x += this.sx;
    this.y += this.sy;
}

  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  }

  changeDir(dir){
    console.log(dir);
    switch (dir) {
      case "Up":
        if (this.sy !=-10 && this.sy!=10) {
          this.sx=0;
          this.sy=-10;
        }
        break;
      case "Right":
        if (this.sx !=-10 && this.sx!=10) {
          this.sx=10;
          this.sy=0;
        }
        break;
      case "Left":
        if (this.sx !=-10 && this.sx!=10) {
          this.sx=-10;
          this.sy=0;
        }
        break;
      case "Down":
        if (this.sy !=-10 && this.sy!=10) {
          this.sx=0;
          this.sy=10;
        }
        break;
    }
  }
}

class Food {
  constructor(){
    this.x = getRandomPos();
    this.y = getRandomPos();
  }
}

function controller(evt){
  dir = evt.key.replace("Arrow", '');
  snake.changeDir(dir);
}

getRandomPos = () => (Math.floor(Math.random() * (60 - 1 + 1)) + 1) * 10;


let canvas = document.getElementById('game-canvas');
ctx = canvas.getContext("2d");
let snake = new Snake();
let food = new Food();
window.addEventListener("keydown", controller);
window.setInterval(game, 1000/15);

function game(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  snake.draw();
}
