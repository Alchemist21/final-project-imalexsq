import React from 'react';
import axios from 'axios';
import ActionButtons from './ActionButtons';

export default class GetAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount = () => {
    axios
      .post('http://127.0.0.1:8080/getAnswers', {
        qId: this.props.qId
      })
      .then(res => {
        this.setState({ answers: res.data });
      })
      .catch(err => console.log(err));
  };

  render() {
    const { answers } = this.state;

    return (
      <React.Fragment>
        {answers.map(answer => {
          return (
            <li key={Math.random()} className="list-group-item">
              {answer.aDesc} by {answer.account} |{' '}
              {answer.accepted ? null : (
                <ActionButtons
                  qId={this.props.qId}
                  aId={answer.aId}
                  account={this.props.account}
                  contract={this.props.contract}
                />
              )}
            </li>
          );
        })}
      </React.Fragment>
    );
  }
}
