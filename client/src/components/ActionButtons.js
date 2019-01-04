import React from 'react';
import axios from 'axios';

export default class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false,
      loading: '',
      success: ''
    };
  }

  handleAnswerAccept = async e => {
    const { aId, qId, contract, account } = this.props;
    this.setState({ loading: 'PLEASE WAIT...', disabled: true });

    let tx = await contract.methods.acceptAnswer(aId).send({
      from: account
    });

    let winner = tx.events.answerAccepted.returnValues.winner;

    axios
      .post('http://127.0.0.1:8080/acceptAnswer', {
        aId,
        qId,
        winner
      })
      .then(res => {
        this.setState({
          disabled: false,
          success: 'Winning answer selected!',
          loading: ''
        });
      })
      .catch(e => console.log(e));
    this.setState({ loading: '', disabled: false });
  };

  render() {
    const { disabled } = this.state;

    return (
      <React.Fragment>
        <input
          type="button"
          name="accept"
          className="btn btn-success"
          value="Accept"
          disabled={disabled}
          onClick={this.handleAnswerAccept}
        />
        <br />
        {this.state.loading}
        {this.state.success}
      </React.Fragment>
    );
  }
}
