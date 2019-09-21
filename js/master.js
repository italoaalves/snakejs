//Global Variables
const deviceWidth = (window.innerWidth > 0) ? window.innerWidth : screen.width,
score = document.getElementById('score'),
feedSfx = new Audio("https://alvesitalo.github.io/snake.js/sfx/feed.wav"),
gameOverSfx = new Audio("https://alvesitalo.github.io/snake.js/sfx/gameover.wav"),
bUp = '<img src="/img/up-arrow.png">',
bRight = '<img src="/img/right-arrow.png">',
bDown = '<img src="/img/down-arrow.png">',
bLeft = '<img src="/img/left-arrow.png">';

let overlayHome, canvas, frame,
gamePad, ctx, body, snake, food,
func, draw, i, blockSize;


//Classes
class Snake {
  constructor(blockSize){
    this.x = 100;
    this.y = 80;
    this.sx = blockSize;
    this.sy = 0;
    this.color = "lime";
    this.feed = false;
    this.tail = [{}];
    this.curDir = 'Right';
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
      ctx.fillRect(block.x, block.y, blockSize-2, blockSize-2);
    }
  }

  changeDir(dir){
    this.curDir = dir;

    switch (dir) {
      case "Up":
        if (!this.sy) {
          this.sx=0;
          this.sy=-blockSize;
        }
        break;
      case "Right":
        if (!this.sx) {
          this.sx=blockSize;
          this.sy=0;
        }
        break;
      case "Left":
        if (!this.sx) {
          this.sx=-blockSize;
          this.sy=0;
        }
        break;
      case "Down":
        if (!this.sy) {
          this.sx=0;
          this.sy=blockSize;
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
    ctx.fillRect(this.x, this.y, blockSize-2, blockSize-2);
  }
}


//Functions
getRandomPos = () => (Math.floor(Math.random() * (((canvas.width)/blockSize)-1 - 1 + 1)) + 1) * blockSize;

function starter(evt){
    if(evt.key === "Enter" || evt.type == "touchstart"){
      window.clearInterval(draw);
      window.removeEventListener("keydown", starter);
      window.removeEventListener("touchstart", starter);

      overlayHome = document.getElementById('home');

      snake = new Snake(blockSize);
      food = new Food();

      overlayHome.remove();
      score.innerText = "0";
      window.addEventListener("keydown", controller);
      func = window.setInterval(game, 120);
    }
}

function gameOver(){
  draw = window.setInterval(headBlink, 500);
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
    ctx.fillRect(snake.tail[0].x, snake.tail[0].y, blockSize-2, blockSize-2);
    i = false;
  } else {
    ctx.clearRect(snake.tail[0].x, snake.tail[0].y, blockSize-2, blockSize-2);
    i = true;
  }
}

function controller(evt){
  if (evt.type == 'keydown') {
    dir = evt.key.replace("Arrow", '');
    snake.changeDir(dir);
  } else {
    snake.changeDir(evt);
    swapButtons();
  }
}

function swapButtons(){
  if (snake.curDir == 'Down' || snake.curDir == 'up') {
    buttons[0].setAttribute('onclick', "controller('Left')");
    buttons[0].innerHTML = bLeft;

    buttons[1].setAttribute('onclick', "controller('Right')");
    buttons[1].innerHTML= bRight;
  } else {
    buttons[0].setAttribute('onclick', "controller('Up')");
    buttons[0].innerHTML = bUp;

    buttons[1].setAttribute('onclick', "controller('Down')");
    buttons[1].innerHTML = bDown;
  }
}

function game(){
  //Colision
  if (snake.tail.some(block => block.x === snake.x && block.y === snake.y)) {
    if (!(snake.x === snake.tail[1].x)){
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

//Canvas creation
if (deviceWidth < 600) {
  canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'game-canvas');
  canvas.setAttribute('width', '300px');
  canvas.setAttribute('height', '300px');

  buttons = [document.createElement('button'), document.createElement('button')];

  buttons[0].setAttribute('onclick', 'controller("Up")');
  buttons[0].innerHTML = bUp;


  buttons[1].setAttribute('onclick', 'controller("Down")');
  buttons[1].innerHTML = bDown;

  console.log(buttons);
  console.log(buttons[0].innerHTML)

  gamePad = document.getElementById('game-pad');
  gamePad.appendChild(buttons[0]);
  gamePad.appendChild(buttons[1]);

  blockSize = 10;
} else {
  canvas = document.createElement('canvas');
  canvas.setAttribute('id', 'game-canvas');
  canvas.setAttribute('width', '400px');
  canvas.setAttribute('height', '400px');

  blockSize = 20;
}

frame = document.getElementById('frame');
frame.appendChild(canvas);
ctx = canvas.getContext("2d");

//chrome hack
if (navigator.appVersion.indexOf("Chrome/") != -1) {
  const frame = document.getElementById("frame");
  frame.setAttribute("class", "gradient-rainbow2");
}

//Begin
window.addEventListener("keydown", starter);
window.addEventListener("touchstart", starter);
