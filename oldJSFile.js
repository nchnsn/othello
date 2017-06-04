

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
    var flipNeighbor = function(color, piece){
        var rowIndex = $(piece).parent().index();
        var columnIndex = $(piece).index();
        var neighbors = {
           up:$(piece).parent().index() - 1,
           down:$(piece).parent().index() + 1,
           right:$(piece).index() + 1,
           left:$(piece).index() - 1
       }
       console.log($("tbody")[0].children[rowIndex].children[columnIndex]);
       console.log(scoreBoard.board[neighbors.up][columnIndex]);
       if(scoreBoard.board[neighbors.up][columnIndex] === color ){
           console.log('big flippin');
           lightFlip(columnIndex, neighbors.up, piece);
       }
      
        // loop through all neighbors
        // left neighbor
      /*  var left = scoreBoard.board[$(piece).parent().index()][$(piece).index() - 1];
        var right = scoreBoard.board[$(piece).parent().index()][$(piece).index() + 1];
        var up = scoreBoard.board[$(piece).parent().index() - 1][$(piece).index()];
        var down = scoreBoard.board[$(piece).parent().index() + 1][$(piece).index()];
        console.log(left);
        console.log(right);
        console.log(up);
        console.log(down);
        if(left === 'w'){
            console.log('white to my left');
        }
         if(right === 'w'){
            console.log('white to my right');
        }
        if(up === 'w'){
            console.log('white to my top');
        }
        if(down === 'w'){
            console.log('white to my bottom');
        }*/
     /*   var left = scoreBoard.board[$(piece).parent().index()][$(piece).index() - 1];
        var right = scoreBoard.board[$(piece).parent().index()][$(piece).index() + 1];
        var up = scoreBoard.board[$(piece).parent().index() - 1][$(piece).index()];
        var down = scoreBoard.board[$(piece).parent().index() + 1][$(piece).index()];
        var neighbors = [up, right, down, left].filter(function(element){
            return element ? true : false;
        });  // check for neighbors up, right, bottom, left
        
        neighbors.forEach(function(element){
            if(element !== color){
                element = color;
                flipNeighbor(element);
            }
        });*/
            // if neighbor has same color change color
                // call flipNeighbor on neighbor.
                
    }

// flip Piece on click
var flipPiece = function() {
    console.log(scoreBoard.board[$(this).parent().index()][$(this).index() + 1]);
    var test = this;
    console.log(test);
    flipNeighbor('b', test);
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
        console.log($(this).children().hasClass('none'));
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

var lightFlip = function(x, y, piece){
    console.log(piece);
   if(scoreBoard.whitesTurn){
        scoreBoard.board[y][x] = 'w';
        $(piece).removeClass("black");
        $(piece).addClass("white");
        scoreBoard.white++;
    } else {
        scoreBoard.board[y][x] = 'b';
        $(piece).removeClass("black");
        $(piece).addClass("white");
            scoreBoard.black++;
        }
        console.log(piece);
}



// opening game sequence - create 16 squares, flip 4 over
 // make all pieces links
 var pieceNum = 0;
 $pieces = $("td").append("<a href = '#'" + "class = 'piece none'></a>");
 $pieces;
 $("table").on("click", "td", flipPiece);
 console.log('heyooo');
