import React from 'react';
import axios from 'axios';
import QuestionCard from './QuestionCard';

export default class ListQuestions extends React.Component {
  state = {
    questions: [],
    header: [],
    error: '',
    loading: '',
    toggleView: false
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
        .map(question => (
          <QuestionCard
            question={question}
            utils={utils}
            accounts={accounts}
            contract={contract}
          />
        ));
    } else {
      allQ = questions.map(question => (
        <QuestionCard
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
