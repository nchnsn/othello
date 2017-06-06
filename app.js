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
}

var renderViewFlip = function(x, y, color){
    var colorToRemove = color === 'black' ? 'white' : 'black';
     document.getElementsByTagName("table")[0].children[0].children[y].children[x].children[0].classList.remove(colorToRemove);
     document.getElementsByTagName("table")[0].children[0].children[y].children[x].children[0].classList.add(color)
    var row = document.getElementsByTagName("table")[0].children[0].children[y];
    var cell = document.getElementsByTagName("table")[0].children[0].children[y].children[x];
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
    checkNeighbor(x,y);
    
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
    console.log(checkAllNeighbors(x,y));
}

var addPieceManual = function(turn, x, y){
    var piece = new Piece(turn, x, y);
    scoreBoard.pieces.push(piece);
    scoreBoard.board[y][x] = turn;
    renderView(x, y, scoreBoard.turn);
}
    

// *** FLIP / CHECK NEIGHBORS ***

    // check if next piece is opp color
var checkNeighbor = function(x,y){
    var pieceUp = scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x] : 'NA';
    var pieceRight = scoreBoard.board[y][x + 1];
    var pieceDown = scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x] : 'NA';
    var pieceLeft = scoreBoard.board[y][x - 1];
    var neighbors = [pieceUp, pieceRight, pieceDown, pieceLeft];
    if(neighbors.some(function(element){
        return element === scoreBoard.turn;
    })){
       console.log('lets flipppa');
    }
    console.log('up ' + pieceUp);
    console.log('right ' + pieceRight);
    console.log('down ' + pieceDown);
    console.log('left ' + JSON.stringify(pieceLeft));
    console.log(JSON.stringify(scoreBoard.board));
}

var checkAllNeighbors = function(x, y, direction){
    var startingPoint = scoreBoard.board[y][x];
    var runTracker = [];
    // check all neighbors
    var pieceUp = {
        color: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x] : 'NA',
        x: x,
        y:y - 1,
        flip: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x] === scoreBoard.turn : false,
        direction: 'up'
    }
    

    var pieceDown = {
        color: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x] : 'NA',
        x: x,
        y:y + 1,
        flip: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x] === scoreBoard.turn : false,
        direction: 'down'
    }
    var pieceRight = {
        color: scoreBoard.board[x + 1] ? scoreBoard.board[y][x + 1] : 'NA',
        x: x + 1,
        y:y,
        flip: scoreBoard.board[x + 1] ? scoreBoard.board[y][x + 1] === scoreBoard.turn : false,
        direction: 'right'
    }
    var pieceLeft = {
        color: scoreBoard.board[x - 1] ? scoreBoard.board[y][x - 1] : 'NA',
        x: x - 1,
        y:y,
        flip: scoreBoard.board[x - 1] ? scoreBoard.board[y][x - 1] === scoreBoard.turn : false,
        direction: 'left'
    }
    var neighbors = [pieceUp, pieceRight, pieceDown, pieceLeft];

    neighbors.forEach(function(element){
        if(element.color === scoreBoard.turn){
            console.log('DIRECTION ' + element.direction);
            console.log('yes!');
            console.log(element);
            runTracker = [];
            initRun(element.x, element.y, element.direction);
            
        } else {
            console.log('DIRECTION ' + element.direction);
            console.log('No!');
            console.log(element);
        }
    });
    

    function initRun(x,y, direction){
        runTracker.push([x,y]);

        if(direction === 'up'){
            nextPiece = scoreBoard.board[y - 1][x];
            if(nextPiece === scoreBoard.board[y][x]){
                console.log('run again');
                initRun(x, y - 1, direction);
            } else if(nextPiece === startingPoint){
                console.log('end run');
                if(runTracker.length > 0){
                    console.log('flipp this!');
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                }
            } else {
                console.log('notthing');
            }
        }  else if(direction === 'right'){
            nextPiece = scoreBoard.board[y][x + 1];
            // check for opp color
            if(nextPiece === scoreBoard.board[y][x]){
                initRun(x + 1, y, direction);
            // check for end of run
        } else if(nextPiece === startingPoint){
                if(runTracker.length > 0){
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            // check for empty piece
            } else {
            }
        } else if (direction === 'down'){
            nextPiece = scoreBoard.board[y + 1][x];
            if(nextPiece === scoreBoard.board[y][x]){
                console.log('call again');
                runPieces++;
                console.log(runPieces);
                initRun(x, y + 1, direction);
            } else if(nextPiece === startingPoint){
                console.log('end run');
                if(runTracker.length > 0){
                    console.log('flipp this!');
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            } else {
                console.log('notthing');
            }
        } else  if(direction === 'left'){
            nextPiece = scoreBoard.board[y][x - 1];
            // check opp color
            if(nextPiece === scoreBoard.board[y][x]){
                console.log('run again');
                initRun(x - 1, y, direction);
            // check for end of run
            } else if(nextPiece === startingPoint){
                console.log('end run');
                if(runTracker.length > 0){
                    console.log('flipp this!');
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            } else {
                console.log('notthing');
            }
        }
    }
    // end init run
    
}

// end checkAllNeighbors

var checkForRun = function(x,y){
    var shouldExecute = false;
    // check all neighbor for opposite piece
    console.log(checkAllNeighbors(x,y));
        // if match, check for matches only on the opposite side
            // if same color, repeat check on opposite side
            // if opp color change should execute to true
    // check should exectute flag to see if you should execute run
        // excute run if true
}

var executeRun = function(){

}

    

// flip pieces
    // if check neighbor is true and run is more than 1, flip pieces

// *** Timeline ***

var allCells = document.getElementsByTagName("td");
for(var i = 0; i < allCells.length; i++){
    var xCor = i < 8 ? i : i % 7;
    var yCor = i < 8 ? 0 : Math.floor(i / 7);
}
$("table").on("click", "td", addPieceAuto);
startGame();

