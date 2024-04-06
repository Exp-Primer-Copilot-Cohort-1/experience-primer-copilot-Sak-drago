//create a webserver
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Comment = require('./commentModel');

mongoose.connect('mongodb://localhost/commentDB');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/comments', function (req, res) {
    Comment.find(function (err, comments) {
        if (err) {
            res.send(err);
        }
        res.json(comments);
    });
});

app.post('/comments', function (req, res) {
    var comment = new Comment();
    comment.author = req.body.author;
    comment.text = req.body.text;
    comment.save(function (err) {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Comment added'});
    });
});

app.listen(3000);
console.log('Server is running on port 3000');
// Path: commentModel.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({