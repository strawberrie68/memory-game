let mainBox = document.querySelector("#mainBox");
mainBox.style.pointerEvents = "none";
let sizeOfGrid = 35;
// let level = 1; 
let background = new Audio('/sounds/background.mp3');
background.loop = true;
// background.play();


localStorage.setItem("level", 1);
let level = localStorage.getItem("level");
document.querySelector(".level").innerHTML= ` Level:  ${level}`
// create tiles
//  I gave an id to each div tag
for (let i = 0; i < sizeOfGrid; i++) {
  mainBox.innerHTML += `<div id=${i} onclick="mark(event)" class="box"></div>`
}

//***
//  number of tiles : start from 5. increment it by 1 each time
// I hard coded the number but it should be incremented by 1 when the player moves to the next level. 

//the shorest array length is 5 (level 1)
//the longest array length is 20 (level 16)
//need to save the tiles to a variable-->how tho
let numOftiles = 5
localStorage.setItem("tiles", numOftiles);
let tiles = localStorage.getItem("tiles");
document.querySelector(".tileCount").innerHTML = `Tiles: \u00A0\u00A0\u00A0\u00A0 / ${tiles}  `


// rendomly choose numbers. *Make sure that there is no duplicate numbers
let randomArray = [];
let playerArray = [];



//when user click start
//items are not clickable until
//randomizer will run


let count = 0;

function randomizer(){
  booSound.play();
  while (count < tiles) {
    // a number will be randomly picked nth times and store them in an array 
    // each title has an unique number so that we can keep track of which tile is clicked 
    let randomNumber = Math.floor(Math.random() * sizeOfGrid)
    if (!randomArray.includes(randomNumber)) {
      randomArray.push(randomNumber)
      count++
    }
    checkCounter()

  }

}


// add an event listener to keep track of which titles  player clicked 

let tracker = 0;
let boxes = document.querySelectorAll(".box")
function mark(event) {
  // store selected titles in an array 
  // player shouldn't be able to add more than the number of tiles

  if (!playerArray.includes(event.target.id) && tracker < tiles) {
    playerArray.push((event.target.id))
    event.target.classList.add("yellow")
    document.querySelector(".tileCount").innerHTML = `Tiles: ${tracker + 1}/ ${tiles}`
    tracker++
  
  }else if(playerArray.includes(event.target.id)){
 
    playerArray.splice(playerArray.indexOf(event.target.id), 1);
    event.target.classList.remove("yellow");
    tracker--
    document.querySelector(".tileCount").innerHTML = `Tiles: ${tracker}/ ${tiles}`
  }

}


// reset 

document.querySelector(".resetBtn").addEventListener("click", () => {
  document.querySelector('.startBtn').disabled = false;

  //might need to get ride of reload -> as it might not work
  location.reload();
})

let booSound = new Audio('/sounds/booSound.mp3');
booSound.loop = false;

let clickSound = new Audio('/sounds/click.mp3');
clickSound.loop = false 



//level 1 all five numbers will light up the respective tile all the same time for 5sec. As the level goes up, the number of tile will be incremented by 1. 

let counter = 5 ;
let setCount;
let startBtn = document.querySelector(".startBtn");


startBtn.addEventListener("click", randomizer);



function checkCounter(){
  document.querySelector("#countdown").innerHTML = `Count Down:  ${counter} `;
  displayTiles()
     if(setCount == undefined){
        setCount = setInterval(countdown, 1000);
     }

}


//2. display count down while those tiles are flashing so players know how much time left. 

function countdown(){
    if(counter <= 0){
        document.querySelector("#countdown").innerHTML = `Time's Up ! `;
       clearInterval(setCount);
       removeTileColor();
    }else{
        document.querySelector("#countdown").innerHTML = `Count Down:  ${counter-1} `;
        counter = counter -1 
    }
}



function displayTiles(){
    mainBox.style.pointerEvents = "none";
    for(let i=0; i<randomArray.length; i++){
         document.getElementById(randomArray[i]).classList.add("yellow")
    }
}


//3. after 5secs the tile will go back to defualt colour 

function removeTileColor(){
    mainBox.style.pointerEvents = "unset";
    document.querySelector('.startBtn').disabled = true;
    for(let i=0; i<randomArray.length; i++){
    document.getElementById(randomArray[i]).classList.remove("yellow")
   }
}


//4. the computer waits for the player to click 5 tiles

function checkAnswers(){
  mainBox.style.pointerEvents = "none";
  document.querySelector('.startBtn').disabled = false;
  let allAnswers = []
    if(playerArray.length === randomArray.length){
  
  let sortedArray1 = playerArray.sort((a,b)=>a-b);
  let sortedArray2 = randomArray.sort((a,b)=>a-b);
  
  for(let i=0; i<sortedArray1.length; i++){
        if(sortedArray1[i] == sortedArray2[i] ){
          allAnswers.push('true')
        }else{
          allAnswers.push('false')
        }
  }
  let gameOver = new Audio('/sounds/gameOver1.mp3');
  gameOver.loop = false;

  if(allAnswers.includes('false')){
    document.querySelector("#countdown").innerHTML = `You Lose`;
    gameOver.play();
    document.getElementById("gameOver").innerHTML = "G A ME O V E R";
  }else{
    level = Number(level) + 1
    document.querySelector(".level").innerHTML= ` Level:  ${level}`
    tiles = Number(tiles) + 1
    document.querySelector(".tileCount").innerHTML = `Tiles: \u00A0\u00A0\u00A0\u00A0 / ${tiles}  `
    document.querySelector("#countdown").innerHTML = `You Win!`;
    

    resetAll();
    // randomizer();
    counter = 5;
    tracker = 0;
    numOftiles = numOftiles + 1;
    setCount= undefined;
    // displayTiles();
    // checkCounter();
  }}

}




function resetAll (){
  boxes.forEach((box) => {
    box.classList.remove("yellow")
    // box.classList.remove("grey") 
})

    randomArray = [];
    playerArray = [];
    count = 0
   
}




//5. Have a button "done" when the player finished selecting tiles 

let doneBtn = document.querySelector(".doneBtn");
doneBtn.addEventListener("click",checkAnswers)



//6. compare if the tiles the player selected and randomly selected tiles are a perfect match.

  //WRONG TILE
//if the player click the wrong tile, the game resets
// -> go back to level 1 
// -> the array length is back to 0

  //RIGHT TILE
//if the player click all the tiles
//-> player level up
//-> add a level
//-> increase the length of the array


//Final LVEL
//If the player reach the final level level 16
//-> games stop
//-> pop up is shown
//-> congrats the player
//-> button for replay


//Michelle
//increase level
//increase randomarray length
//reset


// Sachi
// toggle tiles
// disable to click anything before clicking the start button 

function ghostMoves(){
  let id = null;
  const elem = document.getElementById("animate");
  let pos = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame(){
    if( pos == 50){
      clearInterval(id);
    }else{
      pos++;
      elem.style.right = pos + "px";
      
    }
  }
}



function startSequence(){
  ghostMoves();
  const buttonGone = document.getElementById("initalStart")
  buttonGone.classList.add("hidden");
  const elem = document.getElementById("animate");
  setTimeout(function(){
    elem.style.backgroundImage="url(/images/boo-bubble.png)";
    booSound.play();
  }, 500); 
   setTimeout(function(){
  document.getElementById("textBubble").innerText = "Boo, did I scare you?"
  document.body.addEventListener('click', talk)
  }, 1000); 
 
}
let clicks = 0;
function talk(){

let speech =["Welcome to our game MEMORY!","your goal is to memorize","EVERYTHING","if you don't, you lose", "click start to begin"];

  if(clicks <4){
    clicks += 1;
    clickSound.play();
  
  document.getElementById("textBubble").innerText = speech[clicks];
  }else if (clicks === 4){
    setTimeout(function(){
      document.getElementById("animate").style.display = "none";
      clickSound.play();
    }, 200); 
  }
  else{
    document.getElementsByClassName("startBtn").style.backgroundColor = "red";
  }
  
}