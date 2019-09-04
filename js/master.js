class Snake {
  constructor(){
    this.x = 100;
    this.y = 80;
    this.sx = 10;
    this.sy = 0;
    this.color = "green";
    this.size = 1;
    this.tail = [];
  }

  update(){
   for (var i = 0; i < this.tail.length; i++) {
     this.tail[i] = this.tail[i+1];
   }

    this.tail[this.size-1] = {x: this.x, y: this.y}

    this.x += this.sx;
    this.y += this.sy;

    if(this.x > canvas.width){
      this.x = 0;
    }
    if(this.x < 0){
      this.x = canvas.width;
    }

    if(this.y > canvas.height){
      this.y = 0;
    }
    if(this.y < 0){
      this.y = canvas.height;
    }
}

  draw(){
    ctx.fillStyle = this.color;
    for(let i of this.tail){
      ctx.fillRect(i.x, i.y, 10, 10);
    }
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
  dir = evt.key.replace("Arrow", '');
  snake.changeDir(dir);
}

getRandomPos = () => (Math.floor(Math.random() * (50 - 1 + 1)) + 1) * 10;


const canvas = document.getElementById('game-canvas');
const score = document.getElementById('score');
ctx = canvas.getContext("2d");
let snake = new Snake();
let food = new Food();
window.addEventListener("keydown", controller);
window.setInterval(game, 60);
window.focus();

function game(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  snake.draw();
  food.draw();

  if(snake.x == food.x && snake.y == food.y){
    food.update();
    snake.size++;
    score.innerText = snake.size.toString();
  }
}
