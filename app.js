// *** Model ***
// Score Board - track the board position, number of pieces, turn, and present score
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
    lastMove:[],
    turn:'white',
    white:0,
    black:0,
    history:[]
}

// Piece Object - model the individual piece and all of it's props
// Piece Maker - Function
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
    document.getElementById(color + "Score").innerHTML++;
    console.log(scoreBoard);
    scoreBoard.lastMove.push([x,y]);
    scoreBoard.history.push(JSON.stringify(scoreBoard));
    console.log(scoreBoard.history);
}

var renderViewFlip = function(x, y, color){
    var colorToRemove = color === 'black' ? 'white' : 'black';
    document.getElementsByTagName("table")[0].children[0].children[y].children[x].children[0].classList.remove(colorToRemove);
    document.getElementById(colorToRemove + "Score").innerHTML--;
    document.getElementsByTagName("table")[0].children[0].children[y].children[x].children[0].classList.add("flipInX");
    document.getElementsByTagName("table")[0].children[0].children[y].children[x].children[0].classList.add(color);
    document.getElementById(color + "Score").innerHTML++;
}

// *** Controller ***
// Start Game
var startGame = function(){
    // remove all visual  pieces from board
   $(".piece").remove();
    // reset scoreBoard
    scoreBoard = {
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
    lastMove:[],
    white:0,
    black:0,
    history:[]
}

// add initial pieces
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
} 

var addPieceAuto = function(){
    var x = $(this).index();
    var y = $(this).parent().index();
    if(scoreBoard.board[y][x] === 0){
        var turn = scoreBoard.turn;
        var piece = new Piece(turn, x, y);
        scoreBoard.pieces.push(piece);
        scoreBoard.board[y][x] = turn;
        renderView(x, y, scoreBoard.turn);
        scoreBoard.turn === 'white' ? scoreBoard.turn = 'black' : scoreBoard.turn = 'white';
        document.getElementById('turn').innerHTML = scoreBoard.turn;
        flipTurn();
        console.log(checkAllNeighbors(x,y));
    }
    
}

var addPieceManual = function(turn, x, y){
    var piece = new Piece(turn, x, y);
    scoreBoard.pieces.push(piece);
    scoreBoard.board[y][x] = turn;
    renderView(x, y, scoreBoard.turn);
}

// *** FLIP / CHECK NEIGHBORS ***


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

    var pieceUpRight = {
        color: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x + 1] : 'NA',
        x: x + 1,
        y:y - 1,
        flip: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x + 1] === scoreBoard.turn : false,
        direction: 'upRight'
    }
    

    var pieceDown = {
        color: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x] : 'NA',
        x: x,
        y:y + 1,
        flip: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x] === scoreBoard.turn : false,
        direction: 'down'
    }

     var pieceDownRight = {
        color: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x + 1] : 'NA',
        x: x + 1,
        y:y + 1,
        flip: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x + 1] === scoreBoard.turn : false,
        direction: 'downRight'
    }

    var pieceRight = {
        color: scoreBoard.board[x + 1] ? scoreBoard.board[y][x + 1] : 'NA',
        x: x + 1,
        y:y,
        flip: scoreBoard.board[x + 1] ? scoreBoard.board[y][x + 1] === scoreBoard.turn : false,
        direction: 'right'
    }

     var pieceDownLeft = {
        color: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x - 1] : 'NA',
        x: x - 1,
        y:y + 1,
        flip: scoreBoard.board[y + 1] ? scoreBoard.board[y + 1][x - 1] === scoreBoard.turn : false,
        direction: 'downLeft'
    }

    var pieceLeft = {
        color: scoreBoard.board[x - 1] ? scoreBoard.board[y][x - 1] : 'NA',
        x: x - 1,
        y:y,
        flip: scoreBoard.board[x - 1] ? scoreBoard.board[y][x - 1] === scoreBoard.turn : false,
        direction: 'left'
    }

     var pieceUpLeft = {
        color: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x - 1] : 'NA',
        x: x - 1,
        y:y - 1,
        flip: scoreBoard.board[y - 1] ? scoreBoard.board[y - 1][x - 1] === scoreBoard.turn : false,
        direction: 'upLeft'
    }
    var neighbors = [pieceUp, pieceUpRight, pieceDownRight, pieceRight, pieceDown, pieceDownLeft, pieceLeft, pieceUpLeft];

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
            }
        } else if (direction === 'upRight'){
            nextPiece = scoreBoard.board[y - 1][x + 1];
            if(nextPiece === scoreBoard.board[y][x]){
                console.log('call again');
                initRun(x + 1, y - 1, direction);
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
            }
        } else if(direction === 'right'){
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
            } 
        } else if(direction === 'downRight'){
            nextPiece = scoreBoard.board[y + 1][x + 1];
            // check for opp color
            if(nextPiece === scoreBoard.board[y][x]){
                initRun(x + 1, y + 1, direction);
            // check for end of run
            } else if(nextPiece === startingPoint){
                if(runTracker.length > 0){
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            }
        } else if (direction === 'down'){
            nextPiece = scoreBoard.board[y + 1][x];
            if(nextPiece === scoreBoard.board[y][x]){
                console.log('call again');
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
            }
        } else if(direction === 'downLeft'){
            nextPiece = scoreBoard.board[y + 1][x - 1];
            // check for opp color
            if(nextPiece === scoreBoard.board[y][x]){
                initRun(x - 1, y + 1, direction);
            // check for end of run
            } else if(nextPiece === startingPoint){
                if(runTracker.length > 0){
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            }
        } else if(direction === 'left'){
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
            } 
        } else if(direction === 'upLeft'){
            nextPiece = scoreBoard.board[y - 1][x - 1];
            // check for opp color
            if(nextPiece === scoreBoard.board[y][x]){
                initRun(x - 1, y - 1, direction);
            // check for end of run
            } else if(nextPiece === startingPoint){
                if(runTracker.length > 0){
                    runTracker.forEach(function(element){
                        scoreBoard.board[element[1]][element[0]] = startingPoint;
                        renderViewFlip(element[0], element[1], startingPoint);
                    });
                    console.log(scoreBoard.board);
                }
            }
        } 
    }
}

// *** Timeline ***
var allCells = document.getElementsByTagName("td");
for(var i = 0; i < allCells.length; i++){
    var xCor = i < 8 ? i : i % 7;
    var yCor = i < 8 ? 0 : Math.floor(i / 7);
}
$("table").on("click", "td", addPieceAuto);
startGame();

// *** CSS related JS ***

    // Triggering the Turn Flip on each Turn Change
var flipTurn = function(){
    if(document.getElementById("turnTracker").classList.contains ("circle-container-black")){
         document.getElementById("turnTracker").classList.remove("circle-container-black");
    } else {
         document.getElementById("turnTracker").classList.add("circle-container-black");
    }
}

var clearTable = function(){
    var allPieces = document.getElementsByClassName("piece");
        for(var i = 0; i < allPieces.length; i++){
            allPieces[i].classList.add("slideOutDown");
        }
    document.getElementById("blackScore").innerHTML = 0;
    document.getElementById("whiteScore").innerHTML = 0; 
     if(document.getElementById("turnTracker").classList.contains ("circle-container-black")){
         document.getElementById("turnTracker").classList.remove("circle-container-black");
    }   
    setTimeout(function(){startGame()},500);
}

// undo 

var undo = function(){
    console.log(scoreBoard.lastMove);
    var lastX = scoreBoard.lastMove[scoreBoard.lastMove.length - 1][0];
    var lastY = scoreBoard.lastMove[scoreBoard.lastMove.length - 1][1];
    var modelLast = scoreBoard.board[lastY][lastX];
    var renderLast = document.getElementsByTagName("table")[0].children[0].children[lastY].children[lastX];
    console.log(lastX);
    console.log(lastY);
    console.log(modelLast);
    console.log(renderLast);
    console.log(renderLast.children[0].classList);
    // document.getElementById(modelLast + "Score").innerHTML--;
    // document.getElementById(scoreBoard.turn + "Score").innerHTML++;
    
    renderLast.children[0].remove();
    scoreBoard = JSON.parse(scoreBoard.history[scoreBoard.history.length - 2]);
    
    // var currentColor = scoreBoard.board[scoreBoard.lastMove.pop()[1]][scoreBoard.lastMove.pop()[0]];
    //scoreBoard.board = JSON.parse(scoreBoard.history[scoreBoard.history.length - 2]);
    //var last =  document.getElementsByTagName("table")[0].children[0].children[scoreBoard.lastMove.pop()[0]].children[scoreBoard.lastMove.pop()[1]];
    //last.children[0].classList.remove(currentColor);
    //scoreBoard.history.pop();
    
}
