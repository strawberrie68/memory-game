// Background Music setting ---------------------
let background = new Audio();
function playAudio() {
  background.src = "./sounds/title.mp3";
  background.autoplay = false;
  background.loop = true;
  background.volume = 0.1;
}

playAudio();

function pauseAudio() {
  background.pause();
}

function togglePlay() {
  return background.paused ? playAudio() : pauseAudio();
}

let booSound = new Audio("./sounds/booSound.mp3");
booSound.loop = false;

let clickSound = new Audio("./sounds/click.mp3");
clickSound.loop = false;

// Basic default settings ------------------------
let mainBox = document.querySelector("#mainBox");
let countDown = document.querySelector("#countdown");
let randomArray = [];
let playerArray = [];
let sizeOfGrid = 35;

if (localStorage.getItem("level") === null) {
  localStorage.setItem("level", 1);
}

if (localStorage.getItem("tiles") === null) {
  localStorage.setItem("tiles", 5);
}

let level = localStorage.getItem("level");
document.querySelector(".level").innerHTML = ` Level: ${level}`;

let tiles = localStorage.getItem("tiles");
document.querySelector(
  ".tileCount"
).innerHTML = `Tiles: \u00A0\u00A0\u00A0\u00A0 / ${tiles}  `;

// create tiles ------------------------------------
//  number of tiles : start from 5. increment it by 1 each time
// I hard coded the number but it should be incremented by 1 when the player moves to the next level.
//from 5 (level 1) to 20 (level 16)

for (let i = 0; i < sizeOfGrid; i++) {
  mainBox.innerHTML += `<div id=${i} onclick="mark(event)" class="box"></div>`;
}

//Start Button click ------------------------------------------------------------------------------------
//when clicked is triggers next sequence,
//dissapears after last speeach bubble and start button can be pressed again
//make it so the gohst dooesnt dissappear until the start has been clicked

let counter = 5;
let setCount;

let startBtn = document.querySelector(".startBtn");
startBtn.addEventListener("click", startSequence);

let clickToContinueMessage;
function startSequence() {
  console.log("start button clicked");
  startBtn.style.display = "none";
  document.querySelector(".unClickableLayer").style.zIndex = "10000";

  const elem = document.getElementById("animate");
  setTimeout(function () {
    elem.style.backgroundImage = "url(./images/boo-bubble.png)";
    booSound.play();
  }, 500);
  setTimeout(function () {
    document.getElementById("textBubble").innerText = "Boo, did I scare you?";
    document.querySelector(".unClickableLayer").addEventListener("click", talk);
  }, 1000);

  ghostMoves();
  clickToContinueMessage = setInterval(countineCounter, 1500);
}

// function to make the ghost move
function ghostMoves() {
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (pos == 50) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.right = pos + "px";
    }
  }
}

// function to make the message 'Click to continue'
let opacity = true;
let blink = document.getElementById("continue");
function countineCounter() {
  blink.style.display = "block";
  opacity === true ? (blink.style.opacity = 1) : (blink.style.opacity = 0);
  opacity = !opacity;
}

// function to display messages
let clicks = 1;
let playBtn = document.querySelector(".playBtn");

function talk() {
  console.log("clicks ", clicks);
  let speech = [
    "Welcome to our game MEMORY!",
    "your goal is to memorize",
    "EVERYTHING",
    "if you don't, you lose",
    "click start to begin",
  ];
  if (clicks < 3) {
    clicks++;
    clickSound.play();
    document.getElementById("textBubble").innerText = speech[clicks];
  } else if (clicks == 3) {
    clicks++;
    clickSound.play();
    document.getElementById("textBubble").innerText = speech[clicks];
    playBtn.style.display = "block";
  } else if (clicks == 4) {
    blink.style.display = "none";
    clearInterval(clickToContinueMessage);
    document.getElementById("continue").classList.add("displayNone");
    playBtn.addEventListener("click", function () {
      this.style.display = "none";
      randomizer();
    });

    document.getElementById("animate").style.display = "none";
    document.querySelector(".unClickableLayer").style.zIndex = "1";
    mainBox.style.pointerEvents = "auto";
  }
}

//generate randome tiles --------------------------------------------------------
// a number will be randomly picked nth times and store them in an array
// each title has an unique number so that we can keep track of which tile is clicked
let count = 0;
function randomizer() {
  while (count < Number(tiles)) {
    let randomNumber = Math.floor(Math.random() * sizeOfGrid);
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber);
      count++;
    }
    checkCounter();
  }
}

function checkCounter() {
  countDown.innerHTML = `Count Down:  ${counter} `;
  if (setCount == undefined) {
    setCount = setInterval(countdown, 1000);
  }

  displayTiles();
}

//display count down while those tiles are flashing so players know how much time left.

function countdown() {
  if (counter <= 0) {
    countDown.innerHTML = `Select Tiles! `;
    clearInterval(setCount);
    removeTileColor();
  } else {
    countDown.innerHTML = `Count Down:  ${counter - 1} `;
    counter = counter - 1;
  }
}

function displayTiles() {
  for (let i = 0; i < randomArray.length; i++) {
    document.getElementById(randomArray[i]).classList.add("yellow");
  }
}

//after 5secs the tile will go back to defualt colour
function removeTileColor() {
  for (let i = 0; i < randomArray.length; i++) {
    document.getElementById(randomArray[i]).classList.remove("yellow");
  }
}

// add an event listener to keep track of which titles player clicked -------------------------
// store selected titles in an array
// player shouldn't be able to add more than the number of tiles

let tracker = 0;
let boxes = document.querySelectorAll(".box");
function mark(event) {
  if (!playerArray.includes(event.target.id) && tracker < tiles) {
    playerArray.push(event.target.id);
    event.target.classList.add("yellow");
    document.querySelector(".tileCount").innerHTML = `Tiles: ${tracker + 1}/ ${tiles}`;
    tracker++;
  } else if (playerArray.includes(event.target.id)) {
    playerArray.splice(playerArray.indexOf(event.target.id), 1);
    event.target.classList.remove("yellow");
    tracker--;
    document.querySelector(".tileCount").innerHTML = `Tiles: ${tracker}/ ${tiles}`;
  }

  if (tracker == tiles) {
    checkAnswers();
  }
}

function checkAnswers() {
  let allAnswers = [];
  if (playerArray.length === randomArray.length) {
    let sortedArray1 = playerArray.sort((a, b) => a - b);
    let sortedArray2 = randomArray.sort((a, b) => a - b);

    for (let i = 0; i < sortedArray1.length; i++) {
      sortedArray1[i] == sortedArray2[i]
        ? allAnswers.push("true")
        : allAnswers.push("false");
    }
    let gameOver = new Audio("./sounds/gameOver1.mp3");
    gameOver.loop = false;

    if (allAnswers.includes("false")) {
      countDown.innerHTML = `You Lose`;
      gameOver.play();
      document.getElementById("gameOver").innerHTML = "G A ME O V E R";
      document.querySelector(".main-resetBtn").style.display = "block";
      localStorage.setItem("level", 1);
      localStorage.setItem("tiles", 5);
    } else {
      countDown.innerHTML = `You Win!`;
      playBtn.style.display = "block";
      document.querySelector(".playBtn").innerHTML = "Next level";
      counter = 5;
      tracker = 0;
      setCount = undefined;
      goBAM();
      resetAll();
    }
  }
}

function goBAM() {
  setTimeout(function () {
    document.getElementById("goGhost").classList.add("displayNone");
    booSound.play();
  }, 600);
}

function resetAll() {
  level = Number(level) + 1;
  localStorage.setItem("level", level);
  document.querySelector(".level").innerHTML = ` Level:  ${level}`;

  tiles = Number(tiles) + 1;
  localStorage.setItem("tiles", tiles);
  document.querySelector(
    ".tileCount"
  ).innerHTML = `Tiles: \u00A0\u00A0\u00A0\u00A0 / ${tiles}  `;
  document.getElementById("goGhost").classList.remove("displayNone");

  randomArray = [];
  playerArray = [];
  count = 0;

  boxes.forEach((box) => {
  box.classList.remove("yellow");
  });
}

// reset
document.querySelector(".main-resetBtn").addEventListener("click", () => {
  localStorage.setItem("tiles", 5);
  localStorage.setItem("level", 1);
  location.reload();
});

document.querySelectorAll(".resetBtn").forEach((x) => {
  x.addEventListener("click", () => {
    localStorage.setItem("tiles", 5);
    localStorage.setItem("level", 1);
    location.reload();
  });
});

//5. Have a button "done" when the player finished selecting tiles

// let doneBtn = document.querySelector(".doneBtn");
// doneBtn.addEventListener("click",checkAnswers)

//Things to Do

//show wrong and right colours on the tiles ->later if time/bored -> hard

//you win or lose in middle of screen ->easy

//get rid of the done button ->easy

//use local storage ->mid

//have maybe a score board -> mid

//Have all the tiles change colours as the player level up ->later if bored ->hard

//Final LVEL ->mid/fun
//If the player reach the final level level 16
//-> games stop
//-> pop up is shown
//-> congrats the player
//->a major surprise
//-> button for replay

//Design ideas

//make title - tetris fotn with their colours

//background green

//tiles are yellow and glowy

//pick a good colour when selected and and wrong

//
