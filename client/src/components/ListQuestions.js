import React from 'react';
import QuestionCard from './QuestionCard';

export default class ListQuestions extends React.Component {
  state = {
    questions: [],
    header: [],
    error: '',
    loading: '',
    toggleView: false
  };

  componentDidMount = async () => {
    let ev = await this.props.contract.getPastEvents('questionAdded', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    ev.map(async q => {
      let res = await this.props.contract.methods
        .getQuestion(q.returnValues[0])
        .call();
      this.setState({ questions: [...this.state.questions, res] });
    });
  };

  toggleView = e => {
    this.setState({ toggleView: !this.state.toggleView });
  };

  render() {
    const { questions, toggleView } = this.state;
    const { utils, accounts, contract } = this.props;

    let allQ;
    if (toggleView) {
      allQ = questions
        .filter(question => question.funder === accounts[0])
        .map(question => {
          return (
            <QuestionCard
              key={Math.random()}
              question={question}
              utils={utils}
              accounts={accounts}
              contract={contract}
            />
          );
        });
    } else {
      allQ = questions.map(question => (
        <QuestionCard
          key={Math.random()}
          question={question}
          utils={utils}
          accounts={accounts}
          contract={contract}
        />
      ));
    }

    return (
      <React.Fragment>
        <ul className="nav nav-pills mb-3">
          <li className="nav-item">
            <input
              type="button"
              className={
                this.state.toggleView ? 'btn nav-link ' : 'btn nav-link active'
              }
              value="All Qs"
              onClick={this.toggleView}
            />
          </li>
          <li className="nav-item">
            <input
              type="button"
              className={
                this.state.toggleView ? 'btn nav-link active' : 'btn nav-link '
              }
              value="Your Qs"
              onClick={this.toggleView}
            />
          </li>
        </ul>
        {allQ}
      </React.Fragment>
    );
  }
}
