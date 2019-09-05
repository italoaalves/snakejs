class Snake {
  constructor(){
    this.x = 100;
    this.y = 80;
    this.sx = 10;
    this.sy = 0;
    this.color = "green";
    this.feed = false;
    this.tail = [{}];
  }

  update(){
    this.tail.unshift({x: this.x, y: this.y});

    if (this.feed) {
      this.feed = false;
    } else {
      this.tail.pop();
    }

    this.x += this.sx;
    this.y += this.sy;

    if (this.x > canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y > canvas.height) {
      this.y = 0;
    }
    if (this.y < 0) {
      this.y = canvas.height;
    }
}

  draw(){
    ctx.fillStyle = this.color;
    for (let block of this.tail) {
      ctx.fillRect(block.x, block.y, 10, 10);
    }
  }

  changeDir(dir){
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
    this.color = "red";
  }

  update(){
    this.x = getRandomPos();
    this.y = getRandomPos();
  }

  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 10, 10);
  }
}

function controller(evt){
  if (!start) {
    window.setInterval(game, 1000/15);
    aperte.remove();
    start = true;
  }
  dir = evt.key.replace("Arrow", '');
  snake.changeDir(dir);
}

function gameOver(){
  console.log("YOU DIED");
}

getRandomPos = () => (Math.floor(Math.random() * (48 - 1 + 1)) + 1) * 10;

const canvas = document.getElementById('game-canvas');
const score = document.getElementById('score');
const aperte = document.getElementById('home');
ctx = canvas.getContext("2d");

let snake = new Snake();
let food = new Food();
let start = false;
let wait = ms => new Promise((r, j)=>setTimeout(r, ms))

window.addEventListener("keydown", controller);
window.focus();

function game(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  food.draw();
  snake.draw();

  if(snake.x == food.x && snake.y == food.y){
    snake.feed = true;
    food.update();
    score.innerText = snake.size.toString();
  }
}
