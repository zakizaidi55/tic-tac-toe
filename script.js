const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winnigPositions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];

// let create a function to iitialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        // initialise the css property again
        box.classList = `box box${index+1}`;
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current player - ${currentPlayer}` 
}

initGame();

function checkGameOver() {
    console.log("inside the function of game over")
    let answer = "";
    winnigPositions.forEach((position)=> {
        // all three boxes should be non empty and have the same value
        if((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== ""  || gameGrid[position[2]] !== "" ) 
        &&( gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            if(gameGrid[position[0]] === "X") {
                answer = "X";
            }

            else {
                answer = "O";
            }

            // disable the pointer Events to stop the further action
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            console.log("Winner", answer);
            // now we got to know who is winner 
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });
    if(answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`
        newGameBtn.classList.add("active");
        return;
    }

    // check the TIE condition
    let filledCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "") {
            filledCount++;
        }
    });
    if(filledCount === 9) {
        gameInfo.innerText = "Game Tied";
        newGameBtn.classList.add("active");
    }
    
}   

function handleClick(index) {
    if(gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer; //changes reflect on UI
        gameGrid[index] = currentPlayer; // changes in the grid array to check the status
        boxes[index].style.pointerEvents = "none"; 
        // swapping the turn now
        swapTurn();
        // checking any player wins or not
        checkGameOver();
    }
}

function swapTurn () {
    if(currentPlayer === "X") {
        currentPlayer = "O"; 
    }

    else {
        currentPlayer = "X";
    }
    
    gameInfo.innerText = `Current player - ${currentPlayer}`
}

boxes.forEach((box, index) => {
    box.addEventListener("click", ()=> {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);


