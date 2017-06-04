// *** Model ***
// Score Board - track the board position, number of pieces, turn, and present score
    // Board Position

    // Number of Pieces

    // Who's Turn



    // Current Score

    // History
var scoreBoard = {
    board:[[0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]],
    pieces:[],
    turn:'white',
    white:0,
    black:0,
    history:[]
}

// Piece Object - model the individual piece and all of it's props

// Piece Maker - Function
    // color
    // Y
    // X
    // Number 
    // neighbors
        // left, right, up, down
var Piece = function(turn, x, y){
    this.color = turn;
    this.y = y;
    this.x = x;
    this.neighbors = {};
}


// *** View ***
// Update View

var renderView = function(x, y, color){
    var row = document.getElementsByTagName("table")[0].children[0].children[y];
    var cell = document.getElementsByTagName("table")[0].children[0].children[y].children[x];
    var pieceNode = document.createElement("a");
    pieceNode.classList.add("piece", color);
    cell.appendChild(pieceNode);

    // cell.classList.add('piece', color);
    /*
    scoreBoard.board.forEach(function(element){
        element.forEach(function(element, index){
            if(element === 'white'){
                var temp = getElementByTagName("table");
              //  temp.children[0].class('');
            }
        });
    });
    */
}



// *** Controller ***
// Start Game
var startGame = function(){
    addPiece('white', 3, 3);
    addPiece('black', 3, 4);
    addPiece('white', 4, 4);
    addPiece('black', 4, 3);
    document.getElementById('turn').innerHTML = 'White';
   
    
}




// onclick add piece
 

// add piece on board
    // create new piece push to ScoreBoard
var addPiece = function(turn, x, y){
// add piece to model
   if(x === undefined){
       x = $(this).index();
   }
   if(y === undefined){
       y = $(this).parent().index();
   }
   if(turn === undefined){
       turn = scoreBoard.turn;
   }
    var piece = new Piece(turn, x, y);
    scoreBoard.pieces.push(piece);
    scoreBoard.board[y][x] = turn;
// render piece on board
    renderView(x, y, scoreBoard.turn);
// update ScoreBoard
    
    scoreBoard.turn === 'white' ? scoreBoard.turn = 'black' : scoreBoard.turn = 'white';
    document.getElementById('turn').innerHTML = scoreBoard.turn;
    checkNeighbor();
    
} 

var addPieceAuto = function(){
    var x = $(this).index();
    var y = $(this).parent().index();
    var turn = scoreBoard.turn;
    var piece = new Piece(turn, x, y);
    scoreBoard.pieces.push(piece);
    scoreBoard.board[y][x] = turn;
    renderView(x, y, scoreBoard.turn);
    scoreBoard.turn === 'white' ? scoreBoard.turn = 'black' : scoreBoard.turn = 'white';
    document.getElementById('turn').innerHTML = scoreBoard.turn;
}

var addPieceManual = function(turn, x, y){
    var piece = new Piece(turn, x, y);
    scoreBoard.pieces.push(piece);
    scoreBoard.board[y][x] = turn;
    renderView(x, y, scoreBoard.turn);
}
    

// check neighbor
    // check if next piece is opp color
var checkNeighbor = function(){
    console.log('checkingggg');
    var x = $(this).index();
    console.log(x);
}
    

// flip pieces
    // if check neighbor is true and run is more than 1, flip pieces

// *** Timeline ***

var allCells = document.getElementsByTagName("td");
for(var i = 0; i < allCells.length; i++){
    var xCor = i < 8 ? i : i % 7;
    var yCor = i < 8 ? 0 : Math.floor(i / 7);
   // allCells[i].addEventListener("click", function(){addPiece('white', 0, 0)}); 
}
$("table").on("click", "td", addPiece);
startGame();

