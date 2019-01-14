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
        .getAnswer(a.returnValues[0])
        .call();
      this.setState({ answers: [...this.state.answers, res] });
    });
  };

  render() {
    const { answers } = this.state;

    return (
      <React.Fragment>
        {answers
          .filter(a => a.id === this.props.qId)
          .map(answer => {
            return (
              <li key={Math.random()} className="list-group-item">
                {answer.description} by{' '}
                <ShortAddress account={answer.proposer} />{' '}
                {answer.accepted ? null : (
                  <ActionButtons
                    qId={this.props.qId}
                    aId={answer.id}
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
