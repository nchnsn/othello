var assert = chai.assert;
var expect = chai.expect;
describe('Model', function() {

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
        testGame.takeTurn(0, 0);
        assert.equal(testGame.whiteScore, 3);
        assert.equal(testGame.blackScore, 1);
        // testing for blacks second turn
        let testGame2 = new Othello;
        testGame2.startGame();
        testGame2.takeTurn(0, 0);
        testGame2.takeTurn(0, 1);
        assert.equal(testGame2.whiteScore, 2);
        assert.equal(testGame2.blackScore, 2);
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

    it('full board should update status to over', function() {
        let testGame = new Othello;
        testGame.startGame();
        // still figuring out what ends the game...
        assert.equal(testGame.status, 'over');
    });

    it('placing piece should update status to active', function() {
        let testGame = new Othello;
        testGame.startGame();
        assert.equal(testGame.status, 'active');
    });

    it('starting game should populate model', function() {
        let testGame = new Othello;
        testGame.startGame();
        let expected = {
            whitesTurn:true,
            status:'active',
            board:[[null,null,null,null,null,null,null,null],
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