var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');


var db = mongoose.connect('mongodb://127.0.0.1:27017/bookAPI');

var Book = require('./models/bookModel');

var app = express();

var port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var bookRouter = require('./routes/bookRoutes')(Book);
//var authorRouter = require('./routes/authorRoutes')();

app.use('/api/books', bookRouter);

app.get('/', function (req, res) {
    res.send('welcome to my api!');
});

app.listen(port, function () {
    console.log('application is running on port: ' + port);
});