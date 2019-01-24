import React from 'react';

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
    const { aId, contract, account } = this.props;

    try {
      this.setState({ loading: 'PLEASE WAIT...', disabled: true });

      await contract.methods.acceptAnswer(aId).send({
        from: account
      });

      this.setState({
        loading: '',
        disabled: true,
        success: 'Winning answer selected!'
      });
      window.location.reload();
    } catch (err) {
      this.setState({ loading: String(err), disabled: false });
    }
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
