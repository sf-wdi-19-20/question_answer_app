// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    Question = require('./models/question');

// connect to mongodb
mongoose.connect('mongodb://localhost/ask_anything');

// configure body-parser
app.use(bodyParser.urlencoded({extended: true}));

//// API ROUTES

// send back all questions
app.get('/api/questions', function (req, res) {
  Question.find({}, function (err, questions) {
    res.json(questions);
  });
});

// create new question
app.post('/api/questions', function (req, res) {
  // create new question with data from the body of the request (`req.body`)
  // body should contain the question text itself
  var newQuestion = new Question({
    text: req.body.text
  });

  // save new question
  newQuestion.save(function (err, savedQuestion) {
    res.json(savedQuestion);
  });
});

// get one question
app.get('/api/questions/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id
  Question.findOne({_id: targetId}, function (err, foundQuestion) {
    res.json(foundQuestion);
  });
});

// update question by replacing old question in db
app.put('/api/questions/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id
  Question.findOne({_id: targetId}, function (err, foundQuestion) {
    // update the question's text
    foundQuestion.text = req.body.text;

    // save updated question in db
    foundQuestion.save(function (err, savedQuestion) {
      res.json(savedQuestion);
    });
  });
});

// delete question
app.delete('/api/questions/:id', function (req, res) {
  // set the value of the id
  var targetId = req.params.id;

  // find question in db by id and remove
  Question.findOneAndRemove({_id: targetId}, function (err, deletedQuestion) {
    res.json(deletedQuestion);
  });
});


// listen on port 3000
app.listen(3000, function() {
  console.log('server started on localhost:3000');
});