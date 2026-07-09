const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const reset = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

cells.forEach(cell=>{
    cell.addEventListener("click", cellClick);
});

function cellClick(){

    const index = this.dataset.index;

    if(board[index] != "" || !gameActive)
        return;

    board[index] = currentPlayer;

    this.innerHTML = currentPlayer;

    checkWinner();

}

function checkWinner(){

    let winner = false;

    for(let pattern of winPatterns){

        let a = board[pattern[0]];
        let b = board[pattern[1]];
        let c = board[pattern[2]];

        if(a=="" || b=="" || c=="")
            continue;

        if(a==b && b==c){

            winner = true;
            break;

        }
    }

    if(winner){

        status.innerHTML = "Player " + currentPlayer + " Wins!";
        gameActive = false;
        return;

    }

    if(!board.includes("")){

        status.innerHTML = "Game Draw!";
        gameActive = false;
        return;

    }

    currentPlayer = currentPlayer=="X" ? "O" : "X";

    status.innerHTML = "Player " + currentPlayer + "'s Turn";

}

reset.onclick = function(){

    board = ["","","","","","","","",""];

    currentPlayer = "X";

    gameActive = true;

    status.innerHTML = "Player X's Turn";

    cells.forEach(cell=>{
        cell.innerHTML = "";
    });

}