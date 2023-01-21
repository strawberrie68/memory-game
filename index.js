let mainBox = document.querySelector("#mainBox");
let sizeOfGrid = 35;
let level = 1; 
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
let tiles = 5
document.querySelector(".tileCound").innerHTML = `Tiles: \u00A0\u00A0\u00A0\u00A0 / ${tiles}  `


// rendomly choose numbers. *Make sure that there is no duplicate numbers
let randomArray = [];
let playerArray = [];
// console.log(Math.floor(Math.random() * 10))
// randomly select numbers. (if the grid has 20 tiles, the range of number becomes 0 - 20)


let count = 0;
while (count < tiles) {
  // a number will be randomly picked nth times and store them in an array 
  // each title has an unique number so that we can keep track of which tile is clicked 
  let randomNumber = Math.floor(Math.random() * sizeOfGrid)
  if (!randomArray.includes(randomNumber)) {
    randomArray.push(randomNumber)
    count++
  }

//   console.log("randomArray is ", randomArray)
}


// add an event listener to keep track of which titles  player clicked 

let tracker = 0;
function mark(event) {
  // store selected titles in an array 
  // * a player shouldn't be able to add more than the number of tiles

  if (!playerArray.includes(event.target.id) && tracker < tiles) {
    playerArray.push(Number(event.target.id))
    // console.log("tracker is ", tracker)
    // console.log("playerArray ", playerArray)
    event.target.style.backgroundColor = "yellow"
    document.querySelector(".tileCound").innerHTML = `Tiles: ${tracker + 1}/ ${tiles}`
    tracker++
    // console.log("tracker is ", tracker, "tiles ", tiles)
  }

  if (tracker === tiles) {
    let boxes = document.querySelectorAll(".box")
    boxes.forEach((box) => {
      box.style.filter = "grayscale(0.5)"
    })


    mainBox.style.pointerEvents = "none";

  }
}




// optional reset button

document.querySelector(".resetBtn").addEventListener("click", () => {
  location.reload();
})

  // list of things we need to work on --------------

//1. level 1 all five numbers will light up the respective tile all the same time for 5sec. As the level goes up, the number of tile will be incremented by 1. 

// --- setInterval 


let counter = 5 ;
let setCount;

let startBtn = document.querySelector(".startBtn");



startBtn.addEventListener("click", checkCounter);


function checkCounter(){
     if(setCount == undefined){
        setCount = setInterval(countdown, 1000);
     }

     displayTiles()
   
    
}


//2. display count down while those tiles are flashing so players know how much time left. 

function countdown(){
    // console.log(counter)
    if(counter <= 0){
        // console.log("Times Up!")
        document.querySelector("#countdown").innerHTML = `Time's Up ! `;
       clearInterval(setCount);
       removeTileColor();
    }else{
        document.querySelector("#countdown").innerHTML = `Count Down:  ${counter} `;

        counter = counter -1 
    }
   

    
}



function displayTiles(){
    mainBox.style.pointerEvents = "none";
    for(let i=0; i<randomArray.length; i++){
         
        //  console.log(document.getElementById(randomArray[i]));
         document.getElementById(randomArray[i]).classList.add("yellow")

    }
    // console.log(randomArray)
}


//3. after 5secs the tile will go back to defualt colour 

function removeTileColor(){
    mainBox.style.pointerEvents = "unset";
    for(let i=0; i<randomArray.length; i++){
         
       
        document.getElementById(randomArray[i]).classList.remove("yellow")

   }
}








console.log(randomArray)

//4. the computer waits for the player to click 5 tiles

function checkAnswers(){
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
  if(allAnswers.includes('false')){
    console.log('lose')
   

  }else{
    console.log('level up')
    console.log(allAnswers)
    level = level + 1
    document.querySelector(".level").innerHTML= ` Level:  ${level}`
  }}
//it works for now hahaha
//we can fix it later if it doenst
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

