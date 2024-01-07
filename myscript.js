const TicTacToe = (() => {
    // Constants 
    const PLAYER_X = 'x';
    const PLAYER_O = 'o';
    const EMPTY_CELL = '';

    // Game state
    let currentPlayer = PLAYER_X;
    let board = Array(9).fill(EMPTY_CELL);

    // Winning patterns           
    const toCheck = [
        [[1, 2], [3, 6], [4, 8]],   // Index 0
        [[0, 2], [4, 7]],           // Index 1
        [[0, 1], [5, 8], [4, 6]],   // Index 2
        [[0, 6], [4, 5]],           // Index 3
        [[0, 8], [1, 7], [2, 6], [3, 5]],  // Index 4
        [[2, 8], [3, 4]],           // Index 5
        [[0, 3], [7, 8], [2, 4]],   // Index 6
        [[1, 4], [6, 8]],           // Index 7
        [[0, 4], [2, 5], [6, 7]]    // Index 8
    ];

    // Cache DOM
    const startPage = document.getElementById('startPage');
    const startGameBtn = document.getElementById('startGameBtn');
    const playerXInput = document.getElementById('player-x');
    const cells = document.querySelectorAll('.cell');
    
    // Initialize the game
    init(); 

    function init() {
        // Bind events
        startGameBtn.addEventListener('click', startGame);
        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => markPosition(index, cell));
        });

        // Initialize the game
        startPage.showModal();
    }

    function markPosition(index, cell) {
        if (board[index] != EMPTY_CELL) {
            console.log("already marked");
            return;
        }

        board[index] = currentPlayer;
        updateCellUI(cell, currentPlayer);
        
        if (checkWinner(index)) {
            console.log(`${currentPlayer} wins`);
        } else if (checkDraw()) {
            console.log('Draw');
        }
        
        togglePlayer();
    }

    function updateCellUI(cell, player) {
        cell.textContent = player;
        cell.classList.add(player);
    }

    function togglePlayer() {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    }
    
    function checkWinner(index) {
        return toCheck[index].some((pattern) => 
            board[pattern[0]] === currentPlayer && board[pattern[1]] === currentPlayer
        ); 
    }

    function checkDraw() {
        return board.every((i) => i != '');
    }

    function startGame() {
        startPage.close(); 
        currentPlayer = playerXInput.checked ? PLAYER_X : PLAYER_O;
        console.log(`Game started with ${currentPlayer}`);
    }

    return {
        markPosition
    };
})();
