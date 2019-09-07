//Global Variables
let canvas, score, overlayHome, bodys, ctx, snake, food, func;

//Classes
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

    if (this.x >= canvas.width) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = canvas.width;
    }

    if (this.y >= canvas.height) {
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


//Functions
getRandomPos = () => (Math.floor(Math.random() * (39 - 1 + 1)) + 1) * 10;

function starter(evt){
    if(evt.key === "Enter"){
      window.removeEventListener("keydown", starter);

      canvas = document.getElementById('game-canvas');
      ctx = canvas.getContext("2d");
      score = document.getElementById('score');
      overlayHome = document.getElementById('home');

      snake = new Snake();
      food = new Food();

      overlayHome.remove();
      window.addEventListener("keydown", controller);
      func = window.setInterval(game, 1000/15);
    }
}

function controller(evt){
  dir = evt.key.replace("Arrow", '');
  snake.changeDir(dir);
}

function gameOver(){
  console.log("YOU DIED");
  window.clearInterval(func);

  overlayHome = document.createElement('span');
  overlayHome.setAttribute('id', 'home');
  overlayHome.setAttribute('class', 'home');
  overlayHome.innerHTML = "<h1><span class='ds-die'>YOU DIE</span><br>PRESS ENTER TO RETRY</h1>";
  body = document.getElementsByTagName('Body')[0];
  overlayHome = body.insertBefore(overlayHome, document.getElementById("main-header"));

  window.removeEventListener("keydown", controller);
  window.addEventListener("keydown", starter);
}

function game(){
  //Colision
  if (snake.tail.some(block => block.x === snake.x && block.y === snake.y)) {
    gameOver();
  }

  snake.update();

  //Screen sync
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  food.draw();
  snake.draw();


  //Feeding check
  if(snake.x == food.x && snake.y == food.y){
    snake.feed = true;
    food.update();
    score.innerText = snake.tail.length.toString();
  }
}

//Begin
window.addEventListener("keydown", starter);
