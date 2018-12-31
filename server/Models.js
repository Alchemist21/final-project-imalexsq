var mongoose = require('mongoose');

const QuestionSchema = mongoose.Schema({
  bountyAmount: String,
  description: String,
  funder: String,
  heading: String,
  id: String,
  submitDate: String,
  winner: String,
  closed: Boolean
});

const AnswerSchema = mongoose.Schema({
  qId: String,
  aId: String,
  aDesc: String,
  submitDate: String,
  closed: Boolean,
  account: String
});

const Question = mongoose.model('question', QuestionSchema);
const Answer = mongoose.model('answer', AnswerSchema);

module.exports = { Question, Answer };
