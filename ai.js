function minimax(board, depth, isMaximizing) {
    const scores = { X: -10, O: 10, tie: 0 };
    let result = checkVictory("X", board) ? "X" : (checkVictory("O", board) ? "O" : (isBoardFull(board) ? "tie" : null));

    if (result) {
        return scores[result];
    }

    let bestScore = isMaximizing ? -Infinity : Infinity;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = isMaximizing ? "O" : "X";
            let score = minimax(board, depth + 1, !isMaximizing);
            board[i] = "";
            bestScore = isMaximizing ? Math.max(score, bestScore) : Math.min(score, bestScore);
        }
    }

    return bestScore;
}

function bestMove(board) {
    let bestScore = -Infinity;
    let move;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function isBoardFull(board) {
    return !board.includes("");
}

function checkVictory(val, board) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => board[index] === val)) {
            return true;
        }
    }
    return false;
}



const randomdelay = ()=>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            resolve();
        }, 1000);
    })
}

function displayvictory(val, d, check) {
    let div = document.querySelector(".show-victory");
    div.style.visibility = "visible";
    if (check)
        div.innerHTML = `Player ${val} Wins`;
    else
        div.innerHTML = "Tied!!";
    d.innerHTML = "";
    let button = document.querySelector(".buttons");
    button.style.visibility = "visible";
    button.querySelector("button").addEventListener('click', () => {
        location.reload(true);
    });
}

async function main() {
    let count = 0;
    let spans = document.querySelectorAll('span');
    let board = Array.from(spans).map(span => span.innerHTML);

    let div = document.querySelector(".display");
    div.innerHTML = "Player X chance";

    function updateBoard() {
        board = Array.from(spans).map(span => span.innerHTML);
    }

    function makeMove(index, player) {
        if (board[index] === "") {
            board[index] = player;
            spans[index].innerHTML = player;
            count++;
        }
    }

    async function handleHumanMove(e) {
        if (count % 2 === 0) {
            div.innerHTML = "Player O chance";
            const index = Array.from(spans).indexOf(e.target);
            if (board[index] === "") {
                makeMove(index, "X");
                updateBoard();
                if (checkVictory("X", board)) {
                    displayvictory("X", div, true);
                    document.querySelector(".box").style.pointerEvents = "none";
                    return;
                }
                if (count === 9) {
                    displayvictory("", div, false);
                    document.querySelector(".box").style.pointerEvents = "none";
                    return;
                }
                await randomdelay();
                let aiMove = bestMove(board);
                makeMove(aiMove, "O");
                updateBoard();
                if (checkVictory("O", board)) {
                    displayvictory("O", div, true);
                    document.querySelector(".box").style.pointerEvents = "none";
                    return;
                }
                if (count === 9) {
                    displayvictory("", div, false);
                    document.querySelector(".box").style.pointerEvents = "none";
                } else {
                    div.innerHTML = "Player X chance";
                }
            } else {
                div.innerHTML = "Invalid move";
                await randomdelay();
                div.innerHTML = "Player X chance";
            }
        }
    }

    spans.forEach(span => {
        span.addEventListener('click', handleHumanMove);
    });
}

main();
