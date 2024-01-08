const TicTacToe = (() => {
    
    // Constants 
    const PLAYER_X = 'x';
    const PLAYER_O = 'o';
    const EMPTY_CELL = '';
    
    // Initialize game state
    let currentPlayer = PLAYER_X;  // Start with Player X
    let board = Array(9).fill(EMPTY_CELL);  // Initialize an empty board of size 9
    
    // Define winning patterns 
    const toCheck = [
        [[1, 2], [3, 6], [4, 8]],  
        [[0, 2], [4, 7]],          
        [[0, 1], [5, 8], [4, 6]],  
        [[0, 6], [4, 5]],          
        [[0, 8], [1, 7], [2, 6], [3, 5]],  
        [[2, 8], [3, 4]],          
        [[0, 3], [7, 8], [2, 4]],  
        [[1, 4], [6, 8]],          
        [[0, 4], [2, 5], [6, 7]]   
    ];
    
    // DOM caching 
    const startPage = document.getElementById('startPage');
    const endScreen = document.getElementById('endScreen');
    const startGameBtn = document.getElementById('startGameBtn');
    const quitBtn = document.getElementById('quitBtn');
    const playAgainBtn = document.getElementById('playAgainBtn');
    const playerXInput = document.getElementById('player-x');
    const cells = document.querySelectorAll('.cell');
    const roundOutcome = document.getElementById('roundOutcome');
    const spanElement = document.createElement('span');
    
    // Initialize the game
    init(); 

    function init(firstRound) {
        startGameBtn.addEventListener('click', startGame);  // Start game event listener
        quitBtn.addEventListener('click', () => resetGame(true));  // Quit game event listener
        playAgainBtn.addEventListener('click', () => resetGame(false));  // Play again event listener
        cells.forEach((cell, index) => {  // Add click event listeners to each cell
            cell.addEventListener('click', () => markPosition(index, cell));
        });
        startPage.showModal();  // Display start modal
    }

    // Handle the marking of positions on the board
    function markPosition(index, cell) {
        if (board[index] != EMPTY_CELL) return;  // If cell is already marked, return
        
        board[index] = currentPlayer;  // Update board with current player's symbol
        updateCellUI(cell, currentPlayer);  // Update UI to reflect the move
        
        if (checkWin(index)) displayWinner(currentPlayer, false);  // Check if current player has won
        else if (checkDraw()) displayWinner(currentPlayer, true);  // Check if game is a draw
        
        togglePlayer();  // Switch players
    }

    // Update the UI with the player's symbol
    function updateCellUI(cell, player) {
        cell.textContent = player;
        cell.classList.add(player);
    }

    // Switch between players
    function togglePlayer() {
        currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
    }

    // Display the winner or a draw
    function displayWinner(winner, isDraw) {
        if(isDraw) {
            roundOutcome.textContent = "IT'S A DRAW!";
        } else {
            spanElement.textContent = winner; 
            roundOutcome.innerHTML = '';
            roundOutcome.appendChild(spanElement);
            roundOutcome.appendChild(document.createTextNode(' TAKES THE ROUND!'));   
        }
        endScreen.showModal();  // Show end screen modal
    }
    
    // Check for a win based on the index
    function checkWin(index) {
        return toCheck[index].some((pattern) => 
            board[pattern[0]] === currentPlayer && board[pattern[1]] === currentPlayer
        ); 
    }

    // Check if the game is a draw
    function checkDraw() {
        return board.every((i) => i != '');
    }

    // Start the game by closing the start modal and setting the initial player
    function startGame() {
        startPage.close(); 
        currentPlayer = playerXInput.checked ? PLAYER_X : PLAYER_O;
    }

    // Reset the game state and optionally display the start modal
    function resetGame(toStartScreen) {
        board = Array(9).fill(EMPTY_CELL);  // Reset board
        cells.forEach((cell) => {
            cell.textContent = EMPTY_CELL; 
            cell.classList.remove(PLAYER_X, PLAYER_O);
        }); 
        endScreen.close();  // Close end screen modal
        if(toStartScreen) {
            startPage.showModal();  // Show start modal if needed
        } 
    }
})();
