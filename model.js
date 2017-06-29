var Othello = function(){
    this.whitesTurn = null;
    this.status = null;
    this.board = [
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null],
                [null,null,null,null,null,null,null,null]
                ];
    this.whiteScore = null;
    this.blackScore = null;
    this.history = [];
    this.newPiece = null;
    this.flipped = [];
}

Othello.prototype.changeTurn = function(){
    console.log('change turn');
    console.log(this);
    this.whitesTurn = !this.whitesTurn;
    return this.whitesTurn;
}

Othello.prototype.currentTurn = function(){
    return this.whitesTurn ? 'white' : 'black';
}

Othello.prototype.oppositeTurn = function(){
    return this.whitesTurn ? 'black' : 'white';
}

Othello.prototype.placePiece = function(row, column){
    this.board[row][column] = this.currentTurn();
    this.currentTurn() === 'white' ? this.whiteScore++ : this.blackScore++;
    return [ this.board[row][column], row, column];
}

// helper function for 'flip pieces'
Othello.prototype.flipPiece = function(row, column){
    if(this.board[row][column] === 'white'){
      this.board[row][column] = 'black';  
      this.blackScore++ && this.whiteScore--
    } else {
        this.board[row][column] = 'white';
        this.whiteScore++ && this.blackScore--;
    }
    // render piece to the screen;
    Controller.renderFlip(row, column);
    return [ this.board[row][column], row, column];
}

Othello.prototype.removePiece = function(row, column){
    this.board[row][column] === 'white' ? this.whiteScore-- : this.blackScore--;
    this.board[row][column] = null;
    return [ this.board[row][column], row, column];
}
// *** carry out flips on each turn ***
// check each surrounding piece to see if there are potential moves


// flips available pieces in a move
Othello.prototype.flipAvailable = function(row, column){
    var piecesToFlip = [];
    var game = this;
    var neighbors = {
        up:{
            value:this.board[row - 1] ? this.board[row - 1][column] : null,
            direction:'up',
            row:row - 1,
            column:column
            },
        right:{
            value:this.board[row][column + 1] ? this.board[row][column + 1] : null ,
            direction:'right',
            row:row,
            column:column + 1
            },
        down:{
            value:this.board[row + 1] ? this.board[row + 1][column] : null,
            direction:'down',
            row:row + 1,
            column:column
        },
        left:{
            value:this.board[row][column - 1] ? this.board[row][column - 1] : null, 
            direction:'left',
            row:row,
            column:column - 1
        }
    }

    var checkNeighbors = function(){
        for(let key in neighbors){
            console.log(key);
            console.log(neighbors[key].value);
            if(neighbors[key].value === game.oppositeTurn()){
                console.log('move here');
                piecesToFlip.push([neighbors[key].row, neighbors[key].column]);
                checkMove(key, neighbors[key].row, neighbors[key].column);
            } else {
            console.log('no move');
            }
        }
        console.log(piecesToFlip);
        return piecesToFlip;
    }    
    // for each of the potential moves to see if valid
     
    var checkMove = function(direction, row, column){
        console.log('checking move');
        if(direction === 'up'){
            console.log('checking up');
            if(game.board[row - 1][column] === game.oppositeTurn()){
                piecesToFlip.push([row - 1, column]);
                checkMove('up', row - 1, column);
            } else if(game.board[row - 1][column] === game.currentTurn()){
                console.log('flipping');
                piecesToFlip.forEach(function(element){
                game.flipPiece(element[0],element[1]);
                });
            } 
        } else if(direction === 'right'){
            console.log('checking right');
             if(game.board[row][column + 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column + 1]); 
                checkMove('right', row, column + 1);
            } else if(game.board[row][column + 1] === game.currentTurn()){
                console.log('flipping');
                piecesToFlip.forEach(function(element){
                game.flipPiece(element[0],element[1]);
                });
            }            
        } else if(direction === 'down'){
            console.log('checking down');
            console.log(game.board[row - 1][column]);
            console.log(game.oppositeTurn());
            if(game.board[row + 1][column] === game.oppositeTurn()){
                console.log('check again');
                piecesToFlip.push([row + 1, column]);
                checkMove('down', row + 1, column);
            } else if(game.board[row + 1][column] === game.currentTurn()){
                console.log('flipping');
                piecesToFlip.forEach(function(element){
                game.flipPiece(element[0],element[1]);
                });
            } else {
                console.log('nothing!');
            }
        } else if(direction === 'left'){
            console.log('checking left');
            if(game.board[row][column - 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column - 1]);
                checkMove('left', row, column - 1);
            } else if(game.board[row][column - 1] === game.currentTurn()){
                console.log('flipping');
                piecesToFlip.forEach(function(element){
                game.flipPiece(element[0],element[1]);
                });
            } 
        }
    };
    checkNeighbors(row, column);
    return piecesToFlip;
}

// Valid Move Check - test to see if a valid move
Othello.prototype.validMove = function(row, column){
    var validMove = false;
    var game = this;
    var neighbors = {
        up:{
            value:this.board[row - 1] ? this.board[row - 1][column] : null,
            direction:'up',
            row:row - 1,
            column:column
            },
        upRight:{
            value:this.board[row - 1] && this.board[row - 1][column + 1] ? this.board[row - 1][column + 1] : null,
            direction:'upRight',
            row:row - 1,
            column:column + 1
        },
        right:{
            value:this.board[row][column + 1] ? this.board[row][column + 1] : null ,
            direction:'right',
            row:row,
            column:column + 1
        },
        downRight:{
            value:this.board[row + 1] && this.board[row + 1][column + 1] ? this.board[row + 1][column + 1] : null,
            direction:'downRight',
            row:row + 1,
            column:column + 1
        },
        down:{
            value:this.board[row + 1] ? this.board[row + 1][column] : null,
            direction:'down',
            row:row + 1,
            column:column
        },

        downLeft:{
            value:this.board[row + 1] && this.board[row + 1][column - 1] ? this.board[row + 1][column - 1] : null,
            direction:'downLeft',
            row:row + 1,
            column:column - 1
        },
        left:{
            value:this.board[row][column - 1] ? this.board[row][column - 1] : null, 
            direction:'left',
            row:row,
            column:column - 1
        },
        upLeft:{
            value:this.board[row - 1] && this.board[row - 1][column - 1] ? this.board[row - 1][column - 1] : null,
            direction:'upLeft',
            row:row - 1,
            column:column - 1
        }       
    }

    var checkMove = function(direction, row, column){
        console.log('checking for flips...');
        if(direction === 'up'){
            if(game.board[row - 1][column] === game.oppositeTurn()){
                console.log('same color up...');
                game.flipped.push([row, column]);
                checkMove('up', row - 1, column);
            } else if(game.board[row - 1][column] === game.currentTurn()){
                console.log('got a flip up!');
                game.flipped.push([row, column]);
                validMove = true;
            } 

        } else if(direction === 'right'){
             if(game.board[row][column + 1] === game.oppositeTurn()){
                console.log('same color right...');
                game.flipped.push([row, column]);
                checkMove('right', row, column + 1);
            } else if(game.board[row][column + 1] === game.currentTurn()){
                 console.log('got a flip right!');
                 game.flipped.push([row, column]);
                 validMove = true;
            }       
        } else if(direction === 'down'){
            if(game.board[row + 1][column] === game.oppositeTurn()){
                console.log('same color down...');
                game.flipped.push([row, column]);
                checkMove('down', row + 1, column);
            } else if(game.board[row + 1][column] === game.currentTurn()){
                console.log('got a flip down!');
                game.flipped.push([row, column]);
                validMove = true;
            } 
        } else if(direction === 'left'){
            if(game.board[row][column - 1] === game.oppositeTurn()){
                console.log('same color left...');
                game.flipped.push([row, column]);
                checkMove('left', row, column - 1);
            } else if(game.board[row][column - 1] === game.currentTurn()){
                console.log('got a flip left');
                game.flipped.push([row, column]);
                validMove = true;
            } 
        }
        return validMove;
    };

    for(let key in neighbors){
        console.log('placed a ' + this.currentTurn() + ' piece')
        console.log('checking: ' + key);
        console.log('color is: ' + neighbors[key].value);
        if(neighbors[key].value === game.oppositeTurn()){
            console.log('opp color, check for flips.');
            checkMove(key, neighbors[key].row, neighbors[key].column);
            console.log('Any flips? ' + validMove);
        } else {
            console.log('no move');
        }
    }
    // this.newPiece Update
    console.log(validMove);
    return validMove;
}



// Putting together all the methods that encorperate 1 turn
Othello.prototype.takeTurn = function(row, column){
        // clear turn (current move, piece);
        this.flipped = [];
    if(this.board[row][column] === null && this.validMove(row,column)){
        
        this.newPiece = [row, column];
        this.placePiece(row, column);
        this.flipAvailable(row, column);
        this.changeTurn();
        this.newPiece = [row, column];
        this.history.push(JSON.stringify(this)); 
        Controller.updateScoreBlack();
        Controller.updateScoreWhite();
        Controller.updatePlayerTurn();
        return true;
    } else {
            console.log('not a valid move, try again!');
            return false;
        }
}
// Putting together all the methods that encorperate 1 turn
Othello.prototype.startGame = function(row, column){
    // add 4 initial pieces
    this.board[3][3] = 'black';
    this.board[4][4] = 'black';
    this.board[3][4] = 'white';
    this.board[4][3] = 'white';
    // set status
    this.status = 'active';
    // set turn
    this.whitesTurn = true;
    // set score
    this.whiteScore = 2;
    this.blackScore = 2;
    var game = this;
    Controller.placePiece('black',3,3);
    Controller.placePiece('black',4,4);
    Controller.placePiece('white',4,3);
    Controller.placePiece('white',3,4);

}

// Putting together all the methods that encorperate 1 turn
Othello.prototype.restartGame = function(){
    newBoard.resetBoard();
    newBoard.renderBoard();
    // newGame = new Othello;
    // newGame.startGame();
}

// Putting together all the methods that encorperate 1 turn
Othello.prototype.undoTurn = function(row, column){
        this.removePiece(this.newPiece[0], this.newPiece[1]);
        this.flipped.forEach(function(element){
            newGame.flipPiece(element[0],element[1]);
        });
        this.changeTurn();
        Controller.updateScoreBlack();
        Controller.updateScoreWhite();
        Controller.updatePlayerTurn();
}