var Board = function(){
}

    Board.prototype.renderBoard = function(){
        // render game board in html
        var board = document.createElement("table");
        board.setAttribute('id','tableStart');
        for(let i = 0; i < 8; i++){
            var row = document.createElement("tr");
            for(let j = 0; j < 8; j++){
                var cell = document.createElement("td");
                cell.addEventListener("click", function(){Controller.renderMove(newGame.currentTurn(), i, j)});
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
        var boardWrapper = document.getElementById("boardWrapper");
        boardWrapper.appendChild(board); 
        return board;
    }

// board controls
    Board.prototype.resetBoard = function(){
        var pieces = document.getElementsByClassName('piece');
        console.log(pieces);
        for(let i = 0; i < pieces.length; i++){
            pieces[i].classList.add('slideOutDown');
        }
      setTimeout(clearBoard, 500);
      function clearBoard(){
       $("#tableStart").remove();
        newBoard.renderBoard();
        newGame = new Othello;
        newGame.startGame();
        Controller.updateScoreBlack();
        Controller.updateScoreWhite();
        Controller.updatePlayerTurn();
      }                           
    }

    Board.prototype.undoMove = function(){
        // var undo = document.getElementById('undo');
        newBoard.removePiece(newGame.newPiece[0], newGame.newPiece[1]);
        // newGame.flipped.forEach(function(element){
        //     Controller.renderFlip(element[0], element[1]);
        // });
        newGame.undoTurn(newGame.newPiece[0],newGame.newPiece[1]);
        Controller.undoMove();
    }

    Board.prototype.addPiece = function(){
       // undo last move;
    }

    Board.prototype.flipPiece = function(row, column){
       // undo last move;
    }
    
    Board.prototype.removePiece = function(row, column){

           let parent = document.getElementById("tableStart").children[row].children[column];
           let child = document.getElementById("tableStart").children[row].children[column].children[0];
           parent.removeChild(child);
    }



   
