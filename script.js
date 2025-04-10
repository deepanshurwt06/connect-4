var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;

var gameOver = false;
var board;

var row = 6;
var column = 7;
var currColumns;  // Track the current available row in each column

window.onload = function () {
    setGame();
    document.getElementById("restartBtn").addEventListener("click", reloadGame);
};

function setGame() {
    board = [];
    currColumns = [5, 5, 5, 5, 5, 5, 5]; 

    const boardContainer = document.getElementById("board");
    boardContainer.innerHTML = ""; 

    const winner = document.getElementById("winner");
    winner.innerText = "";

    // Create the board
    for (let r = 0; r < row; r++) {
        let rowArray = [];
        for (let c = 0; c < column; c++) {
            rowArray.push(' '); 

           
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.addEventListener('click', setPiece);
            document.getElementById("board").append(tile);
        }
        board.push(rowArray);
    }
    currPlayer = playerRed;  // Start with the Red player
    gameOver = false; 
    document.getElementById("restartBtn").style.display = "none";
}

function reloadGame(){
    setGame(); 
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let coords = this.id.split("-");  
    let c = parseInt(coords[1]);    
    let r = currColumns[c];          

    if (r < 0) {
        return;
    }
    // Place the piece on the board
    board[r][c] = currPlayer;
    let tile = document.getElementById(r.toString() + "-" + c.toString());

    if (currPlayer == playerRed) {
        tile.classList.add("red-piece");
        currPlayer = playerYellow;
    } else {
        tile.classList.add("yellow-piece");
        currPlayer = playerRed;
    } 
    currColumns[c] -= 1;
    checkWinner();
}

function checkWinner(){
    // Check horizontally 
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < column - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r][c + 1] && board[r][c + 1] == board[r][c + 2] && board[r][c + 2] == board[r][c + 3]) {
                    setWinner(r, c);
                    return;
                }
            }
        }
    }

    // Check vertically 
    for (let c = 0; c < column; c++) {
        for (let r = 0; r < row - 3; r++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c] && board[r + 1][c] == board[r + 2][c] && board[r + 2][c] == board[r + 3][c]) {
                    setWinner(r, c); 
                    return;
                }
            }
        }
    }

    // Check diagonal (bottom-left to top-right)
    for (let r = 3; r < row; r++) {
        for (let c = 0; c < column - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r - 1][c + 1] && board[r - 1][c + 1] == board[r - 2][c + 2] && board[r - 2][c + 2] == board[r - 3][c + 3]) {
                    setWinner(r, c); 
                    return;
                }
            }
        }
    }

    // Check diagonal (top-left to bottom-right)
    for (let r = 0; r < row - 3; r++) {
        for (let c = 0; c < column - 3; c++) {
            if (board[r][c] != ' ') {
                if (board[r][c] == board[r + 1][c + 1] && board[r + 1][c + 1] == board[r + 2][c + 2] && board[r + 2][c + 2] == board[r + 3][c + 3]) {
                    setWinner(r, c); 
                    return;
                }
            }
        }
    }
}

function setWinner(r, c){ // Accept row and column as arguments
    let winner = document.getElementById("winner");
    if (board[r][c] == playerRed) {
        winner.innerText = "Red Wins";
    } else {
        winner.innerText = "Yellow Wins";
    }
    gameOver = true; // End the game
    document.getElementById("restartBtn").style.display = "block";
}

