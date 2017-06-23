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
        var element = { className: 'exists' };
        addClass(element, 'exists');
        var numClasses = element.className.split(' ').length;
        assert.equal(numClasses, 1);
    });

    it('placing piece should update board', function() {
        var element = { className: 'exists' };
        addClass(element, 'new-class');
        var classes = element.className.split(' ');
        assert.equal(classes[1], 'new-class');
    });

    it('full board should update status to over', function() {
        var element = { className: 'exists' };
        addClass(element, 'new-class');
        var classes = element.className.split(' ');
        assert.equal(classes[1], 'new-class');
    });

    it('placing piece should update status to active', function() {
        var element = { className: 'exists' };
        addClass(element, 'new-class');
        var classes = element.className.split(' ');
        assert.equal(classes[1], 'new-class');
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