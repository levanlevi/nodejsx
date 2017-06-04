var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = express.Router();

bookRouter.route('/Books')
    .post(function (req, res) {
        var book = new Book(req.body);
        book.save();
        res.status(201).send(book);
    })
    .get(function (req, res) {
        var query = {};
        if (req.query.genre) {
            query = req.query.genre;
        }
        Book.find(query, function (err, books) {
            if (err)
                res.status(500).send(err);
            else
                res.json(books);
        });
    });

bookRouter.route('/Book/:bookId')
    .get(function (req, res) {
        Book.findById(req.params.bookId, function (err, book) {
            if (err)
                res.status(500).send(err);
            else
                res.send(book);
        })
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api!');
});

app.listen(port, function () {
    console.log('application is running on port' + port);
});