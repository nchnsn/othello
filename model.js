var Othello = function(){
    this.whitesTurn = null;
    this.status = null;
    this.board = [[null,null,null,null,null,null,null,null],
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

Othello.prototype.changeTurn = function(game){
    console.log('change turn');
    console.log(game);
    this.whitesTurn = !this.whitesTurn;
    return this.whitesTurn;
}

Othello.prototype.currentTurn = function(){
    return this.whitesTurn ? 'white' : 'black';
}

Othello.prototype.placePiece = function(row, column){
    this.board[row][column] = this.currentTurn;
    return [ this.board[row][column], row, column];
}

Othello.prototype.flipPiece = function(row, column){
    this.board[row][column] = !this.currentTurn;
    return [ this.board[row][column], row, column]
}

Othello.prototype.removePiece = function(row, column){
    this.board[row][column] = null;
    return [ this.board[row][column], row, column]
}

Othello.prototype.flipPieces = function(row, column){
    console.log('checking for flipss');
}
// Putting together all the methods that encorperate 1 turn
Othello.prototype.takeTurn = function(row, column){
    // place piece
    console.log(this);
    var game = this;
    // this.placePiece(row, column);
    // // flip pieces
    // this.flipPiece();
    // udpate score

    // update history
    // update newPiece
    // update flipped
    // check status
    this.changeTurn(game);
    return 'i made a move :)';
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