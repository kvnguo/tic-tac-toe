const TicTacToe = (() => {
    
    // Constants 
    const PLAYER_X = 'x';
    const PLAYER_O = 'o';
    const EMPTY_CELL = '';
    
    // Initialize Game State
    let currentPlayer = PLAYER_X;
    let board = Array(9).fill(EMPTY_CELL);
    
    // Define Winning Combos
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    
    // Cache DOM 
    const startPage = document.getElementById('startPage');
    const endScreen = document.getElementById('endScreen');
    const startGameBtn = document.getElementById('startGameBtn');
    const quitBtn = document.getElementById('quitBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const playerXInput = document.getElementById('player-x');
    const cells = document.querySelectorAll('.cell');
    const roundOutcome = document.getElementById('roundOutcome');
    const spanElement = document.createElement('span');

    // Initial game state and event listeners
    function init() {
        startGameBtn.addEventListener('click', startGame);
        quitBtn.addEventListener('click', () => resetGame(true));
        playAgainBtn.addEventListener('click', () => resetGame(false));
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => {
                markPosition(index, cell); 
                aiTurn(); 
            });
        });
        startPage.showModal();
    }

    // Mark a position on board
    function markPosition(index, cell) {
        if (board[index] !== EMPTY_CELL) return;
        board[index] = currentPlayer;
        updateCellUI(cell, currentPlayer);
        
        let winner = checkWin(board);
        if (winner) displayWinner(currentPlayer, false);
        else if (checkDraw(board)) displayWinner(currentPlayer, true);
        
        togglePlayer();
    }

    // Update the cell's UI with the player's move
    function updateCellUI(cell, player) {
        cell.textContent = player;
        cell.classList.add(player);
    }

    // Toggle between players
    function togglePlayer() {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    }

    // Display winner or draw
    function displayWinner(winner, isDraw) {
        if (isDraw) {
            roundOutcome.textContent = "IT'S A DRAW!";
        } else {
            spanElement.textContent = winner; 
            roundOutcome.innerHTML = '';
            roundOutcome.appendChild(spanElement);
            roundOutcome.appendChild(document.createTextNode(' TAKES THE ROUND!'));   
        }
        endScreen.showModal();
    }

    // Check if there's a winner
    function checkWin(board) {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (board[a] === board[b] && board[b] === board[c]) {
                if(board[a] != EMPTY_CELL) return board[a];
            }
        }
        return null;
    }      

    // Check draw
    function checkDraw(board) {
        return board.every(cell => cell !== EMPTY_CELL);
    }

    // Check is board is empty 
    function boardIsEmpty() {
        return board.every(cell => cell === EMPTY_CELL);
    }

    // Start the game
    function startGame() {
        startPage.close(); 
        if (!playerXInput.checked && boardIsEmpty()) aiTurn();
    }

    // Function to reset the game state
    function resetGame(toStartScreen) {
        board = Array(9).fill(EMPTY_CELL);
        cells.forEach(cell => {
            cell.textContent = EMPTY_CELL;
            cell.classList.remove(PLAYER_X, PLAYER_O);
        }); 
        currentPlayer = PLAYER_X; 
        endScreen.close();
        if (!playerXInput.checked && boardIsEmpty()) aiTurn();

        
        if (toStartScreen) {
            startPage.showModal();
        }
    }

    // Determine the AI's move
    function aiTurn() {
        let aiMove = currentPlayer === PLAYER_X? bestXMove() : bestOMove();
        markPosition(aiMove, cells[aiMove]);
    }

    // Minimax algorithm to determine the best move for the current player
    function minimax(board, depth, isMaximizing) {
        const win = checkWin(board); 
        if(win === PLAYER_X) return 1;
        if(win === PLAYER_O) return -1; 
        if(checkDraw(board)) return 0; 

        if(isMaximizing) {
            let maxEval = -Infinity; 
            for(let i = 0; i < board.length; i++) {
                if(board[i] === EMPTY_CELL) {
                    board[i] = PLAYER_X; 
                    let eval = minimax(board, depth + 1, false);
                    board[i] = EMPTY_CELL; 
                    maxEval = Math.max(maxEval, eval); 
                }
            }
            return maxEval
        } else {
            let minEval = Infinity; 
            for(let i = 0; i < board.length; i++) {
                if(board[i] === EMPTY_CELL) {
                    board[i] = PLAYER_O; 
                    let eval = minimax(board, depth + 1, true);
                    board[i] = EMPTY_CELL; 
                    minEval = Math.min(minEval, eval);
                }
            }
            return minEval; 
        }
    }

    // Determines the best move for PLAYER_X
    function bestXMove() {
        let maxEval = -Infinity; 
        let move; 
        for(let i = 0; i < board.length; i++) {
            if(board[i] === EMPTY_CELL) {
                board[i] = PLAYER_X;
                let eval = minimax(board, 0, false); 
                board[i] = EMPTY_CELL; 
                if(eval > maxEval) {
                    maxEval = eval; 
                    move = i; 
                }
            }
        }
        return move; 
    }

    // Determines the best move for PLAYER_O
    function bestOMove() {
        let minEval = Infinity; 
        let move; 
        for(let i = 0; i < board.length; i++) {
            if(board[i] === EMPTY_CELL) {
                board[i] = PLAYER_O;
                let eval = minimax(board, 0, true); 
                board[i] = EMPTY_CELL; 
                if(eval < minEval) {
                    minEval = eval; 
                    move = i; 
                }
            }
        }
        return move; 
    }

    // Initialize the game 
    init(); 
})();
