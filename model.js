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
    console.log('flippin');
    console.log(this.board[row][column]);
    console.log(this.oppositeTurn());
    if(this.board[row][column] === 'white'){
      this.board[row][column] = 'black';  
      this.blackScore++ && this.whiteScore--
    } else {
        this.board[row][column] = 'white';
        this.whiteScore++ && this.blackScore--;
    }
    return [ this.board[row][column], row, column];
}

Othello.prototype.removePiece = function(row, column){
    this.board[row][column] = null;
    return [ this.board[row][column], row, column]
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
        for(key in neighbors){
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
        if(direction === 'up'){
            if(game.board[row - 1][column] === game.oppositeTurn()){
                piecesToFlip.push([row - 1, column]);
                checkMove('up', row - 1, column);
            } else if(game.board[row - 1][column] === game.currentTurn()){
                piecesToFlip.forEach(function(element){
                    game.flipPiece(element[0],element[1]);
                });
            } 
        } else if(direction === 'right'){
             if(game.board[row][column + 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column + 1]); 
                checkMove('right', row, column + 1);
            } else if(game.board[row][column + 1] === game.currentTurn()){
                piecesToFlip.forEach(function(element){
                    game.flipPiece(element[0],element[1]);
                });
            }            
        } else if(direction === 'down'){
            if(game.board[row - 1][column] === game.oppositeTurn()){
                piecesToFlip.push([row + 1, column]);
                checkMove('down', row + 1, column);
            } else if(game.board[row + 1][column] === game.currentTurn()){
                piecesToFlip.forEach(function(element){
                    game.flipPiece(element[0],element[1]);
                });
            } 
        } else if(direction === 'left'){
            if(game.board[row][column - 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column - 1]);
                checkMove('left', row, column - 1);
            } else if(game.board[row][column - 1] === game.currentTurn()){
                console.log('ending');
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
    var piecesToFlip = [];
    var validMove = false;
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
    let checkMove = function(direction, row, column){
        if(direction === 'up'){
            if(game.board[row - 1][column] === game.oppositeTurn()){
                piecesToFlip.push([row - 1, column]);
                checkMove('up', row - 1, column);
            } else if(game.board[row - 1][column] === game.currentTurn()){
                return true;
            } 
        } else if(direction === 'right'){
             if(game.board[row][column + 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column + 1]); 
                checkMove('right', row, column + 1);
            } else if(game.board[row][column + 1] === game.currentTurn()){
                return true;
            }       
        } else if(direction === 'down'){
            if(game.board[row - 1][column] === game.oppositeTurn()){
                piecesToFlip.push([row + 1, column]);
                checkMove('down', row + 1, column);
            } else if(game.board[row + 1][column] === game.currentTurn()){
                return true;
            } 
        } else if(direction === 'left'){
            if(game.board[row][column - 1] === game.oppositeTurn()){
                piecesToFlip.push([row, column - 1]);
                checkMove('left', row, column - 1);
            } else if(game.board[row][column - 1] === game.currentTurn()){
                console.log('ending');
                return true;
            } 
        }
        return false;
    };

    for(key in neighbors){
        console.log(key);
        console.log(neighbors[key].value);
        if(neighbors[key].value === game.oppositeTurn()){
            console.log('move here');
            piecesToFlip.push([neighbors[key].row, neighbors[key].column]);
            validMove = checkMove(key, neighbors[key].row, neighbors[key].column) ? true : false;
        } else {
            console.log('no move');
        }
    }
    return validMove;
    // console.log(piecesToFlip);
    // if(piecesToFlip.length > 0){
    //     return true;
    // }
    // else {
    //     return false;
    // } 
}



// Putting together all the methods that encorperate 1 turn
Othello.prototype.takeTurn = function(row, column){
    if(this.board[row][column] === null){
        // place piece
        this.placePiece(row, column);
        // flip pieces
        this.flipAvailable(row, column);
        // update history
        // update newPiece
        // update flipped
        // check status
        this.changeTurn();
        return 'turn taken at: row - ' + row + ', column - ' + column;
    } else {
        return 'already piece here.'
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
}

// Putting together all the methods that encorperate 1 turn
Othello.prototype.restartGame = function(row, column){
    // place piece
    // flip pieces
    // udpate score
    // update history
    // update newPiece
    // update flipped
    // check status
    // change turn 
}

// Putting together all the methods that encorperate 1 turn
Othello.prototype.undoTurn = function(row, column){
    // place piece
    // flip pieces
    // udpate score
    // update history
    // update newPiece
    // update flipped
    // check status
    // change turn 
}