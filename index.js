let mainBox = document.querySelector("#mainBox");
// mainBox.style.pointerEvents = "none";
let sizeOfGrid = 35;
// let level = 1; 
let background = new Audio('./sounds/title.mp3');
background.volume=0.1;
background.play();


function togglePlay() {
  return background.paused ? background.play() : background.pause();
};


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
// let booSound = new Audio('/sounds/booSound.mp3');
let booSound = new Audio('./sounds/booSound.mp3')
booSound.loop = false;

let clickSound = new Audio('./sounds/click.mp3');
clickSound.loop = false 


let count = 0;

function randomizer(){
  startBtn.classList.add('displayNone');


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

  if(tracker == tiles){
    checkAnswers()
       
  }

}


// reset 


document.querySelectorAll('.resetBtn').forEach(x=>{
    x.addEventListener('click', ()=>{
      document.querySelector('.startBtn').disabled = false;
  

      location.reload();

    })
})

// document.querySelector(".resetBtn").addEventListener("click", () => {
//   document.querySelector('.startBtn').disabled = false;
  

//   location.reload();
// })

 

//level 1 all five numbers will light up the respective tile all the same time for 5sec. As the level goes up, the number of tile will be incremented by 1. 

let counter = 5 ;
let setCount;
let startBtn = document.querySelector(".startBtn");


startBtn.addEventListener("click", startSequence);



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
        document.querySelector("#countdown").innerHTML = `Select Tiles! `;
       clearInterval(setCount);
       removeTileColor();
    }else{
        document.querySelector("#countdown").innerHTML = `Count Down:  ${counter-1} `;
        counter = counter -1 
    }
}



function displayTiles(){
    // mainBox.style.pointerEvents = "none";
    for(let i=0; i<randomArray.length; i++){
         document.getElementById(randomArray[i]).classList.add("yellow")
    }
}


//3. after 5secs the tile will go back to defualt colour 

function removeTileColor(){
    // mainBox.style.pointerEvents = "unset";
    // document.querySelector('.startBtn').disabled = true;
    for(let i=0; i<randomArray.length; i++){
    document.getElementById(randomArray[i]).classList.remove("yellow")
   }
}


//4. the computer waits for the player to click 5 tiles

function checkAnswers(){
  // mainBox.style.pointerEvents = "none";
  // document.querySelector('.startBtn').disabled = false;
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
  let gameOver = new Audio('./sounds/gameOver1.mp3');
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
    
    // startBtn.classList.remove('displayNone');
    //boo plays everytime level pass
    booSound.play();
  
   
    counter = 5;
    tracker = 0;
    numOftiles = numOftiles + 1;
    setCount= undefined;
    resetAll();
    // randomizer();
    
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
    startBtn.innerHTML = 'Next level'
   
}




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


let continueNum = 0
function countineCounter(){
  if(continueNum === 0){
    document.getElementById("continue").classList.remove("displayNone")
    continueNum++
  }else{
    document.getElementById("continue").classList.add("displayNone")
  }
}

function startSequence(){

  document.querySelector(".startBtn").classList.add("displayNone")
  document.querySelector(".unClickableLayer").style.zIndex = "10000"
  ghostMoves();
  countineCounter();
  
  //button click
  //layer appears ->have a insivible layer, that spans the whole page
  //when clicked is triggers next sequence,
  //dissapears after last speeach bubble and start button can be pressed again
  //make it so the gohst dooesnt dissappear until the start has been clicked


  const elem = document.getElementById("animate");
  setTimeout(function(){
    elem.style.backgroundImage="url(./images/boo-bubble.png)";
    booSound.play();
  }, 500); 
   setTimeout(function(){
  document.getElementById("textBubble").innerText = "Boo, did I scare you?"
  document.querySelector(".unClickableLayer").addEventListener('click', talk)
  
  }, 1000); 
  
 
}

let clicks = 0;
function talk(){

let speech =["Welcome to our game MEMORY!","your goal is to memorize","EVERYTHING","if you don't, you lose", "click start to begin"];

  if(clicks <3){
    clicks += 1;
    clickSound.play();
    console.log(clicks);
    
  document.getElementById("textBubble").innerText = speech[clicks];
  }else if(clicks ===3){
    document.querySelector(".startBtn").classList.remove("displayNone");
    clicks ++;
    clickSound.play();
    console.log(clicks);
    document.getElementById("textBubble").innerText = speech[clicks];
    document.getElementById("continue").classList.add("displayNone")
  }
  else{
    document.getElementById("animate").style.display = "none";
    document.querySelector(".unClickableLayer").style.zIndex = "1"
    randomizer();
    clickSound.play();
    document.getElementById("mainBox").style.pointerEvents = "auto";
  }
  
}

let blink = document.getElementById('continue');
      setInterval(function() {
        blink.style.opacity = (blink.style.opacity == 0 ? 1 : 0);
      }, 3000);