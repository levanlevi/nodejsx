var should = require('should'),
    sinon = require('sinon');

describe('Book controller tests', function () {
    describe('post', function () {
        it('should not allow empty title on Book', function () {
            var Book = function (book) { this.save = function () { } };

            var req = {
                body: {
                    author: 'Levi'
                }
            }

            var res = {
                status: sinon.spy(),
                send: sinon.spy()
            }

            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req, res);

            res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0]);
            res.send.calledWith('Title is required').should.equal(true);
        });
    });
});