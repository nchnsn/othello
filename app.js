

// define object class for piece
var pieceMaker = function(number, color, row, column){
    this.pieceNumber = number;
    this.color = color;
    this.row = row;
    this.column = column;
}

// define model for game
var scoreBoard = {
    black:0,
    white:0,
    whitesTurn:false,
    pieces:64,
    board: 
        [[0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]],
    history:[]
}



// define click events 


// define algorithym for checking game board
var playerMove = function(){
    // change turn 
    // reduce piees by 1
    //flipCheck

}
    //flipCheck - check surrounding for color match
    var flipNeighbor = function(color){
        console.log(this);
        // loop through all neighbors
        // left neighbor
        /*
        var left = scoreBoard.board[$(this).parent().index()][$(this).index() - 1];
        var right = scoreBoard.board[$(this).parent().index()][$(this).index() + 1];
        var up = scoreBoard.board[$(this).parent().index() - 1][$(this).index()];
        var down = scoreBoard.board[$(this).parent().index() + 1][$(this).index()];
        var neighbors = [up, right, down, left].filter(function(element){
            return element ? true : false;
        });  // check for neighbors up, right, bottom, left
        
        neighbors.forEach(function(element){
            if(element !== color){
                element = color;
                flipNeighbor(element);
            }
        });
            // if neighbor has same color change color
                // call flipNeighbor on neighbor.
                */
    }

// flip Piece on click
var flipPiece = function() {
    console.log(scoreBoard.board[$(this).parent().index()][$(this).index() + 1]);
    flipNeighbor('black');
    if(scoreBoard.whitesTurn){
        scoreBoard.board[$(this).parent().index()][$(this).index()] = 'w';
        if($(this).children().hasClass("none")){
            $(this).children().removeClass("none");
             $(this).children().addClass("white");
            scoreBoard.white++;
        } else if($(this).children().hasClass("black")){
            $(this).children().removeClass("black");
            scoreBoard.black--;
             $(this).children().addClass("white");
            scoreBoard.white++;
        }
       
    } else {
        scoreBoard.board[$(this).parent().index()][$(this).index()] = 'b';
        if($(this).children().hasClass("none")){
            $(this).children().removeClass("none");
            $(this).children().addClass("black");
            scoreBoard.black++;
        } else if($(this).children().hasClass("white")){
            $(this).children().removeClass("white");
            scoreBoard.white--;
            $(this).children().addClass("black");
            scoreBoard.black++;
        }
        
    }

    scoreBoard.history.push(scoreBoard);
    var updateWhite =  document.getElementById("whiteScore");
    console.log(scoreBoard.white);
    updateWhite.innerHTML = scoreBoard.white;
    var updateBlack =  document.getElementById("blackScore");
    console.log(scoreBoard.black);
    console.log(scoreBoard);
    updateBlack.innerHTML = scoreBoard.black;
    scoreBoard.whitesTurn = !scoreBoard.whitesTurn;
    var updateTurn = document.getElementById("turn");
    scoreBoard.whitesTurn ? updateTurn.innerHTML = "White" : updateTurn.innerHTML = "Black";
}



// opening game sequence - create 16 squares, flip 4 over
 // make all pieces links
 var pieceNum = 0;
 $pieces = $("td").append("<a href = '#'" + "class = 'piece none'></a>");
 $pieces;
 $("table").on("click", "td", flipPiece);
 console.log('heyooo');
