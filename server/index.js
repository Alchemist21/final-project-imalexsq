const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();
server.use(express.json());
server.use(bodyParser.json());
server.use(cors());

const mongodb_conn_module = require('./mongodbConnModule');
var db = mongodb_conn_module.connect();

const { Question } = require('./Models');

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

  res.send('OK');
});

server.listen(8080, () => console.log('Listening on port 8080!'));
