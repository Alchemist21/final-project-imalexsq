var mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  bountyAmount: String,
  description: String,
  funder: String,
  heading: String,
  id: String,
  submitDate: String,
  winner: String
});

const AnswerSchema = mongoose.Schema({
  id: Number
});

const Question = mongoose.model('question', QuestionSchema);
const Answer = mongoose.model('answer', AnswerSchema);

module.exports = { Question, Answer };
