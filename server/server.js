const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

const { Question, Answer } = require('./Models');

server.post('/addQuestion', (req, res) => {
  const {
    bountyAmount,
    description,
    funder,
    heading,
    id,
    submitDate,
    winner
  } = req.body;

  Question.create(
    {
      bountyAmount,
      description,
      funder,
      heading,
      id,
      submitDate,
      winner
    },
    function(err) {
      console.log(err);
    }
  );

  res.sendStatus(204);
});

server.post('/addAnswer', (req, res) => {
  const { aDesc, qId } = req.body;

  Answer.create({ qId, aDesc }, function(err, res) {
    console.log(err, res);
  });

  res.send('OK');
});

server.post('/getAnswers', (req, res) => {
  const { qId } = req.body;

  Answer.find({ qId }, function(err, result) {
    res.set('Content-Type', 'application/json');

    res.send(result);
  });
});

server.get('/allQuestions', (req, res) => {
  Question.find({}, function(err, questions) {
    res.set('Content-Type', 'application/json');
    res.send(questions);
  });
});

server.listen(8080, () => console.log('Listening on port 8080!'));
