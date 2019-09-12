//Global Variables
const canvas = document.getElementById('game-canvas'),
ctx = canvas.getContext("2d"),
score = document.getElementById('score'),
feedSfx = new Audio("https://alvesitalo.github.io/snake.js/sfx/feed.wav"),
gameOverSfx = new Audio("https://alvesitalo.github.io/snake.js/sfx/gameover.wav");

let overlayHome, bodys, snake, food, func, draw, i;


//Classes
class Snake {
  constructor(){
    this.x = 100;
    this.y = 80;
    this.sx = 20;
    this.sy = 0;
    this.color = "lime";
    this.feed = false;
    this.tail = [{}];
  }

  update(){
    this.tail.unshift({x: this.x, y: this.y});

    if (this.feed) {
      feedSfx.play();
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
      ctx.fillRect(block.x, block.y, 18, 18);
    }
  }

  changeDir(dir){
    switch (dir) {
      case "Up":
        if (!this.sy) {
          this.sx=0;
          this.sy=-20;
        }
        break;
      case "Right":
        if (!this.sx) {
          this.sx=20;
          this.sy=0;
        }
        break;
      case "Left":
        if (!this.sx) {
          this.sx=-20;
          this.sy=0;
        }
        break;
      case "Down":
        if (!this.sy) {
          this.sx=0;
          this.sy=20;
        }
        break;
    }
  }
}

class Food {
  constructor(){
    this.x = getRandomPos();
    this.y = getRandomPos();
    this.color = "tomato";
  }

  update(){
    this.x = getRandomPos();
    this.y = getRandomPos();
  }

  draw(){
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, 18, 18);
  }
}


//Functions
getRandomPos = () => (Math.floor(Math.random() * (19 - 1 + 1)) + 1) * 20;

function starter(evt){
    if(evt.key === "Enter"){
      window.clearInterval(draw);
      window.removeEventListener("keydown", starter);

      overlayHome = document.getElementById('home');

      snake = new Snake();
      food = new Food();

      overlayHome.remove();
      score.innerText = "0";
      window.addEventListener("keydown", controller);
      func = window.setInterval(game, 120);
    }
}

function gameOver(){
  console.log("YOU DIED");
  window.clearInterval(func);

  gameOverSfx.play();

  overlayHome = document.createElement('span');
  overlayHome.setAttribute('id', 'home');
  overlayHome.setAttribute('class', 'home');
  overlayHome.innerHTML = "<h1>PRESS ENTER TO RETRY</h1>";
  body = document.getElementsByTagName('Body')[0];
  overlayHome = body.insertBefore(overlayHome, document.getElementById("main-header"));

  window.removeEventListener("keydown", controller);
  window.addEventListener("keydown", starter);
}

function headBlink(){
  if(i){
    ctx.fillStyle = "lime";
    ctx.fillRect(snake.tail[0].x, snake.tail[0].y, 18, 18);
    i = false;
  } else {
    ctx.clearRect(snake.tail[0].x, snake.tail[0].y, 18, 18);
    i = true;
  }
}

function controller(evt){
  dir = evt.key.replace("Arrow", '');
  snake.changeDir(dir);
}

function game(){
  //Colision
  if (snake.tail.some(block => block.x === snake.x && block.y === snake.y)) {
    if (!(snake.x === snake.tail[1].x)){
        draw = window.setInterval(headBlink, 500);
        gameOver();
    }
  }

  snake.update();

  //Screen sync
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.draw();
  food.draw();

  //Feeding check
  if(snake.x == food.x && snake.y == food.y){
    snake.feed = true;
    food.update();
    score.innerText = snake.tail.length.toString();
  }
}



//chrome hack
if (navigator.appVersion.indexOf("Chrome/") != -1) {
  const frame = document.getElementById("frame");
  frame.setAttribute("class", "gradient-rainbow2");
}

//Begin
window.addEventListener("keydown", starter);
