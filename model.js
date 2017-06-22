var Othello = function(){
    this.turn = null;
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

Othello.prototype.changeTurn = function(){
// toggle player turn 
}

Othello.prototype.placePiece = function(){
// place piece on board
}

Othello.prototype.flipPiece = function(){
// flip existing piece
}

Othello.prototype.removePiece = function(){
// remove existing piece from board 
}

Othello.prototype.checkForFlips = function(){
// execute flips for placed piece
}
