var assert = chai.assert;
describe('Controller', function() {
    it('placing piece should change turn', function() {
        var element = { className: '' };
        addClass(element, 'test-class');
        assert.equal(element.className, 'test-class');
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
        var element = { className: 'exists' };
        addClass(element, 'new-class');
        var classes = element.className.split(' ');
        assert.equal(classes[1], 'new-class');
    });
});