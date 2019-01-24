import React from 'react';

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aDesc: '',
      loading: '',
      disabled: false,
      success: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAnswerSubmit = async () => {
    const { aDesc } = this.state;
    const { contract, account, qId } = this.props;
    this.setState({ loading: 'PLEASE WAIT...', disabled: true });

    let tx = await contract.methods
      .addAnswer(qId, aDesc)
      .send({ from: account });
    let aId = tx.events.answerAdded.returnValues.id;

    await contract.methods.getAnswer(aId).call();

    this.setState({
      loading: '',
      disabled: false,
      aDesc: '',
      success: 'Answer Added!'
    });
    window.location.reload();
  };

  render() {
    return (
      <React.Fragment>
        <div className="input-group mb-3">
          <input
            type="text"
            name="aDesc"
            className="form-control"
            value={this.state.aDesc}
            placeholder="Your Answer"
            onChange={this.handleChange}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-submit"
              disabled={this.state.disabled}
              onClick={this.handleAnswerSubmit}
            >
              Button
            </button>
          </div>
        </div>
        <br />
        {this.state.loading}
        {this.state.success}
      </React.Fragment>
    );
  }
}
