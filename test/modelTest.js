var assert = chai.assert;
    var expect = chai.expect;
    describe('Model', function() {
    describe('Properties', function() { 

        it('placing piece should change turn', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(0, 0);
            assert.equal(testGame.whitesTurn, false);
        }); 

        it('placing piece should update score', function() {
            // testing for white's first turn
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(2, 3);
            assert.equal(testGame.whiteScore, 4);
            assert.equal(testGame.blackScore, 1);
            // testing for blacks second turn
            let testGame2 = new Othello;
            testGame2.startGame();
            testGame2.takeTurn(2, 3);
            testGame2.takeTurn(2, 4);
            assert.equal(testGame2.whiteScore, 3);
            assert.equal(testGame2.blackScore, 3);
        }); 

        it('placing piece should update board', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(0, 0);
            assert.equal(testGame.board[0][0], 'white');
        }); 

        it('placing piece should NOT update existing pieces', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(3, 3);
            assert.equal(testGame.board[3][3], 'black');
        }); 

        it('game over - full board should update status to over', function() {
            let testGame = new Othello;
            testGame.startGame();
            // still figuring out what ends the game...
            assert.equal(testGame.status, 'over');
        }); 




    }); 

    describe('Helper Methods', function() {
        it('flip piece - changes it on the board', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.board[0][0] = 'white';
            testGame.flipPiece(0,0);
            assert.equal(testGame.board[0][0], 'black');
        }); 

        it('flip available - flips available pieces', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(3, 2);
            assert.equal(testGame.board[3][3], 'white');            
        });
        
        it('placing piece - should update status to active', function() {
            let testGame = new Othello;
            testGame.startGame();
            assert.equal(testGame.status, 'active');
        }); 

        it('remove piece - should update status to active', function() {
            let testGame = new Othello;
            testGame.startGame();
            assert.equal(testGame.status, 'active');
        });

        it('valid move - check for valid moves for white', function() {
            let testGame = new Othello;
            testGame.startGame();
            assert.equal(testGame.validMove(0,0), false);
            assert.equal(testGame.validMove(3,5), false);
            assert.equal(testGame.validMove(5,4), true);
            assert.equal(testGame.validMove(3,2), true);
        });

        it('valid move - check for valid moves for black', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(3,2);
            assert.equal(testGame.validMove(0,0), false);
            assert.equal(testGame.validMove(3,1), false);
            assert.equal(testGame.validMove(2,4), true);
            assert.equal(testGame.validMove(4,2), true);


        });
    }); 
    
    describe('Take Turn', function() {  
        it('correct props on first move', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(2,3);          
            let expected = {
                whitesTurn:false,
                status:'active',
                board:[
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,'white',null,null,null,null],
                    [null,null,null,'white','white',null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null]
                    ],
                whiteScore:4,
                blackScore:1,
                history:[],
                newPiece:null,
                flipped:[],
            };
            expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });

        it('correct props on second move', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(2,3);   
            testGame.takeTurn(2,4);          
            let expected = {
                whitesTurn:true,
                status:'active',
                board:[
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null]
                    ],
                whiteScore:3,
                blackScore:3,
                history:[],
                newPiece:null,
                flipped:[],
            };
            expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });

        it('correct props on third move', function() {
            let testGame = new Othello;
            testGame.startGame();
            testGame.takeTurn(2,3);   
            testGame.takeTurn(2,4);
            testGame.takeTurn(2,5);          
            let expected = {
                whitesTurn:false,
                status:'active',
                board:[
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,'white','white','white',null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null]
                    ],
                whiteScore:5,
                blackScore:2,
                history:[],
                newPiece:null,
                flipped:[],
            };
            expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });

        it('correct props on fourth move', function() {
           let testGame = new Othello;
           testGame.startGame();
           testGame.takeTurn(2,3);   
           testGame.takeTurn(2,4);
           testGame.takeTurn(2,5);          
           testGame.takeTurn(4,2);  
           let expected = {
               whitesTurn:true,
               status:'active',
               board:[
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,'white','white','white',null,null],
                   [null,null,null,'white','black',null,null,null],
                   [null,null,'black','black','black',null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null]
                   ],
               whiteScore:4,
               blackScore:4,
               history:[],
               newPiece:null,
               flipped:[],
           };
           expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });

        it('correct props on fith move', function() {
           let testGame = new Othello;
           testGame.startGame();
           testGame.takeTurn(2,3);   
           testGame.takeTurn(2,4);
           testGame.takeTurn(2,5);          
           testGame.takeTurn(4,2);  
           testGame.takeTurn(5,4);  

           let expected = {
               whitesTurn:false,
               status:'active',
               board:[
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,'white','white','white',null,null],
                   [null,null,null,'white','white',null,null,null],
                   [null,null,'black','black','white',null,null,null],
                   [null,null,null,null,'white',null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null]
                   ],
               whiteScore:7,
               blackScore:2,
               history:[],
               newPiece:null,
               flipped:[],
           };
           expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });
        it('moves on all the edges work', function() {
           // come back to this one!!!
           let testGame = new Othello;
           testGame.startGame();
           testGame.takeTurn(2,3);   
           testGame.takeTurn(2,4);
           testGame.takeTurn(1,3);          
           testGame.takeTurn(4,2);  
           testGame.takeTurn(5,4);  

           let expected = {
               whitesTurn:false,
               status:'active',
               board:[
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,'white','white','white',null,null],
                   [null,null,null,'white','white',null,null,null],
                   [null,null,'black','black','white',null,null,null],
                   [null,null,null,null,'white',null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null]
                   ],
               whiteScore:7,
               blackScore:2,
               history:[],
               newPiece:null,
               flipped:[],
           };
           expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });
        it('cant make a move if no flip available', function() {
           let testGame = new Othello;
           testGame.startGame();
           testGame.takeTurn(0,0);  
           let expected = {
               whitesTurn:true,
               status:'active',
               board:[
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,'black','white',null,null,null],
                   [null,null,null,'white','black',null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null],
                   [null,null,null,null,null,null,null,null]
                   ],
               whiteScore:2,
               blackScore:2,
               history:[],
               newPiece:null,
               flipped:[],
           };
           expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });

    });

    describe('Flip Available', function() {  
    
    });

    describe('Undo Turn Method', function() {  
        //need to implement
        it('sets current model equal to last element in history', function() {
            let testGame = new Othello;
            testGame.startGame();
            assert.equal(testGame.status, 'active');
        }); 
    });

    describe('Start Game Method', function() {  

        it('starting game - populates model', function() {
            let testGame = new Othello;
            testGame.startGame();
            let expected = {
                whitesTurn:true,
                status:'active',
                board:[
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,'black','white',null,null,null],
                    [null,null,null,'white','black',null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null],
                    [null,null,null,null,null,null,null,null]
                    ],
                whiteScore:2,
                blackScore:2,
                history:[],
                newPiece:null,
                flipped:[],
            };
            expect(JSON.stringify(testGame)).to.eql(JSON.stringify(expected));
        });
    }); 

    describe('Restart Game', function() {  
    });
});