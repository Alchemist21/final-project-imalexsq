import React from 'react';
import ActionButtons from './ActionButtons';
import ShortAddress from './ShortAddress';

export default class GetAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: []
    };
  }

  componentDidMount = async () => {
    let ev = await this.props.contract.getPastEvents('answerAdded', {
      fromBlock: 0,
      toBlock: 'latest'
    });

    ev.map(async a => {
      let res = await this.props.contract.methods
        .allAnswers(a.returnValues[0])
        .call();
      this.setState({ answers: [...this.state.answers, res] });
    });
  };

  render() {
    const { answers } = this.state;
    const { id, state } = this.props.question;

    if (state === '0') {
      return (
        <React.Fragment>
          {answers
            .filter(a => a.questionId === id)
            .map(answer => {
              return (
                <li key={Math.random()} className="list-group-item">
                  {answer.description} by{' '}
                  <ShortAddress account={answer.proposer} />{' '}
                  <ActionButtons
                    qId={id}
                    aId={answer.id}
                    account={this.props.account}
                    contract={this.props.contract}
                  />
                </li>
              );
            })}
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          {answers
            .filter(a => a.questionId === id)
            .map(answer => {
              return (
                <li key={Math.random()} className="list-group-item">
                  {answer.description} by{' '}
                  <ShortAddress account={answer.proposer} />{' '}
                </li>
              );
            })}
        </React.Fragment>
      );
    }
  }
}
