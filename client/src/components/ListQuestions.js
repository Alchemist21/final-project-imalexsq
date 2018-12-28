import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer';
import GetAnswers from './GetAnswers';
export default class ListQuestions extends React.Component {
  state = {
    questions: [],
    header: [],
    error: '',
    loading: ''
  };

  componentDidMount = () => {
    axios
      .get('http://127.0.0.1:8080/allQuestions')
      .then(res => {
        const header = Object.keys(res.data[0]);
        this.setState({ questions: res.data, header });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { questions } = this.state;
    return (
      <React.Fragment>
        {questions.map(question => {
          var time = new Date(Number(question.submitDate));
          return (
            <div className="card mb-3" key={Math.random()}>
              <div className="card-body">
                <h5 className="card-title">{question.heading}</h5>
                <p className="card-text">{question.description}</p>
                <p className="card-text">Submitted: {String(time)}</p>
                <p className="card-text">By: {question.funder}</p>
                <p className="card-text">
                  Bounty Amount: {question.bountyAmount} Ether
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <GetAnswers qId={question.id} />
              </ul>
              <div className="card-body">
                <AddAnswer
                  qId={question.id}
                  account={this.props.accounts[0]}
                  contract={this.props.contract}
                />
              </div>
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
