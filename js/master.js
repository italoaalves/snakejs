const bs=bq= 10;
let canvas, ctx;
let curDir=score = 0;
let ax=ay = newFoodPos();
let snkPos = [100, 50];
let snk = [[100, 50],[90, 50],[80, 50]];


window.onload = function() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("keydown", controller);
  setInterval(game, 1000/15);
}

function game() {
  //Snake movement
  switch (curDir) {
    case 0:
      snkPos[1]-=10;
      break;
    case 1:
      snkPos[0]+=10;
      break;
    case 2:
      snkPos[1]+=10;
      break;
    case 3:
      snkPos[0]-=10;
      break;
  }

  snk.unshift(snkPos);
  if (snkPos[0] == ax && snkPos[1] == ay) {
    ax=newFoodPos();
    ay=newFoodPos();
  } else {
    snk.pop();
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0,0, canvas.width, canvas.height);

  //draw snake
  ctx.fillStyle = "green";
  for (let pos of snk){
    console.log(pos);
    ctx.fillRect(pos[0], pos[1], 10, 10);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(ax*10,ay*10, 10, 10);
}

//Controller function
function controller(evt) {
  switch (evt.keyCode) {
    case 37:
      //left
      if (curDir!=3 && curDir!=1) {
        curDir = 3;
      }
      break;
    case 38:
      //up
      if (curDir!=0 && curDir!=2) {
        curDir = 0;
      }
      break;
    case 39:
      //right
      if (curDir!=1 && curDir!=3) {
        curDir = 1;
      }
      break;
    case 40:
      //down
      if (curDir!=2 && curDir!=0) {
        curDir = 2;
      }
      break;
  }
}

function newFoodPos() {
    min = Math.ceil(1);
    max = Math.floor(60);
    return (Math.floor(Math.random() * (max - min + 1)) + min)*10;
}
