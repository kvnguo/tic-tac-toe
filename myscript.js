const Game = (() => {
    let currentPlayer = 'x'
    let board = ['', '', '',
                 '', '', '',
                 '', '', '']
    
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
    ]

    function markPosition(index) {
        if(board[index] === '') {
            board[index] = currentPlayer;  
        }
        else {
            console.log("already marked")
            return
        }

        if(checkWinner(index)) {
            console.log(`${currentPlayer} wins`)
        }
        else if(checkdraw()){
            console.log('Draw')
        } 
        currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
        console.log(board)
    }
    
    function checkWinner(index) {
        return toCheck[index].some((pattern) => 
            board[pattern[0]] === currentPlayer && board[pattern[1]] === currentPlayer
        ); 
    }

    function checkdraw() {
        return board.every((i) => i != '')
    }

    return {
        markPosition
    }
    
})()