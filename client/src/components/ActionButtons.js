import React from 'react';
import axios from 'axios';

export default class ActionButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    };
  }

  handleAnswerAccept = async e => {
    const { aId, contract, account } = this.props;

    await contract.methods.acceptAnswer(aId).send({
      from: account
    });

    axios
      .post('http://127.0.0.1:8080/acceptAnswer', {
        aId
      })
      .then(res => {
        this.setState({ disabled: true });
      })
      .catch(e => console.log(e));
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
      </React.Fragment>
    );
  }
}
