import React from 'react';
import axios from 'axios';
import AddAnswer from './AddAnswer';
import GetAnswers from './GetAnswers';
import ShortAddress from './ShortAddress';

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
        if (res.data.length !== 0) {
          const header = Object.keys(res.data[0]);
          this.setState({ questions: res.data, header });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { questions } = this.state;
    const { utils } = this.props;

    return (
      <React.Fragment>
        <h3>Add navigation to show your questions only</h3>
        <nav className="nav">
          <a className="nav-link active" href="#">
            Active
          </a>
          <a className="nav-link" href="#">
            Link
          </a>
          <a className="nav-link" href="#">
            Link
          </a>
          <a
            className="nav-link disabled"
            href="#"
            tabIndex="-1"
            aria-disabled="true"
          >
            Disabled
          </a>
        </nav>
        {questions.map(question => {
          var time = new Date(Number(question.submitDate));
          return (
            <div className="card mb-3" key={Math.random()}>
              <div className="card-body">
                <h5 className="card-title">{question.heading}</h5>
                <p className="card-text">{question.description}</p>
                <p className="card-text">Submitted: {String(time)}</p>
                <p className="card-text">
                  By: <ShortAddress account={question.funder} />
                </p>
                <p className="card-text">
                  Bounty Amount: {utils.fromWei(question.bountyAmount)} Ether
                </p>
                <p className="card-text">
                  Winner: <ShortAddress account={question.winner} />
                </p>
              </div>
              <ul className="list-group list-group-flush">
                <GetAnswers
                  qId={question.id}
                  account={this.props.accounts[0]}
                  contract={this.props.contract}
                />
              </ul>
              {question.closed ? null : (
                <div className="card-body">
                  <AddAnswer
                    qId={question.id}
                    account={this.props.accounts[0]}
                    contract={this.props.contract}
                  />
                </div>
              )}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}
