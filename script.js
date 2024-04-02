const boxes =document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info")
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions =[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//let's create a function to initialise the game
function initGame(){
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // Ui par empty bhi karna padega
    boxes.forEach((box, index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"
        //initilize boxes with css properties again(grren coclor remove krr do jitne ke badd)
        box.classList = `box box${index+1}`;
    })

    newGameBtn.classList.remove("active");
    gameInfo.innerText =`Current Player - ${currentPlayer}`;  
}

initGame();

function swapTurn(){
    if(currentPlayer == "X"){
        currentPlayer = "O"
    }
    
    else{
        currentPlayer = "X";
    }

    // UI update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkGameOver(){
    let answer =  "";

    winningPositions.forEach((position)=>{

        if((gameGrid[position[0]] != "" || gameGrid[position[1]] !=="" || gameGrid[position[2]] !=="" )
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
            
            //  check the winner

            if(gameGrid[position[0]] === "X")
                answer = "X";

            else
                answer = "O";

            // disable pointer events
            boxes.forEach((box)=>{
                box.style.pointerEvents ="none";
            })    
    
            // now we know x or O winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
         }

    });

    //if we have a winner
    if(answer !== ""){
        gameInfo.innerText = `winner Player ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //when there is tie
    let fillCount = 0;
    gameGrid.forEach((box)=>{
        if(box!==""){
            fillCount++;
        }

        if(fillCount === 9){
            gameInfo.innerText = "game Tied";
            newGameBtn.classList.add("active");
        }
    })





}

function handleClick(index){
    if(gameGrid[index] == ""){
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none"
        //swap the turn
        swapTurn();
        //check koi jeet to mhi gaya
        checkGameOver();
    }
}


boxes.forEach((box, index)=>{
    box.addEventListener("click", () =>{
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);
