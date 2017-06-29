var Controller = {
    renderMove: function(turn, row, column){
        if(newGame.takeTurn(row, column)){
            let square = document.getElementById("tableStart").children[row].children[column];
            square.innerHTML = '<div></div>';
            square.children[0].classList.add(turn, 'piece');
        } else {
            Controller.alertChange();
        }
    },
    placePiece: function(turn, row, column){
            console.log(document.getElementById("tableStart").children[row].children[column]);
            let square = document.getElementById("tableStart").children[row].children[column];
            square.innerHTML = '<div></div>';
            console.log(square);
            square.children[0].classList.add(turn, 'piece');
    },
    renderFlip: function(row, column){
        console.log(document.getElementById("tableStart")[row]);
        let square = document.getElementById("tableStart").children[row].children[column];
        if(square.children[0].classList.contains('white')){
            square.children[0].classList.remove('white');
            square.children[0].classList.add('black');
        } else if (square.children[0].classList.contains('black')) {
            square.children[0].classList.remove('black');
            square.children[0].classList.add('white');
        } 
        console.log(square);
        
    },
    resetGame: function(){
        // restart game
    },
    undoMove: function(){
        // undo move
    },

    // manage the scoreboard
    updateScoreWhite:function(){
        let scoreBoard = document.getElementById('whiteScore');
        scoreBoard.innerText = newGame.whiteScore;
    },
    updateScoreBlack:function(){
        let scoreBoard = document.getElementById('blackScore');
        scoreBoard.innerText = newGame.blackScore;
    },
    updatePlayerTurn:function(){
        let turn = document.getElementById('turnTracker');
 
        if(newGame.currentTurn() === 'black'){
            turn.classList.add('circle-container-black');
        } else {
            turn.classList.remove('circle-container-black')
        }
    },

    alertChange:function(){
        var alert = document.getElementById('invalidMove');
        if(alert.style.display !== 'inline'){
            console.log('showing none');
            alert.style.display = 'inline';
            setTimeout(function(){alert.style.display = 'none'},4000);
        } else {
            console.log(alert.style);
        }
    }            
}






