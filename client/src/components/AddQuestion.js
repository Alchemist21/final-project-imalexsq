import React from 'react';
import axios from 'axios';

export default class AddQuestion extends React.Component {
  state = {
    qHeading: '',
    qDesc: '',
    bAmount: '',
    loading: '',
    disabled: false,
    success: ''
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionSubmit = async () => {
    const { qHeading, qDesc, bAmount } = this.state;
    const { account, contract, utils } = this.props;
    this.setState({ loading: 'PLEASE WAIT...', disabled: true });

    let tx = await contract.methods.addQuestion(qHeading, qDesc).send({
      from: account,
      value: utils.toWei(bAmount)
    });

    let qId = tx.events.questionAdded.returnValues.questionCount;

    const result = await contract.methods.getQuestion(qId).call();

    const {
      bountyAmount,
      description,
      funder,
      heading,
      id,
      submitDate,
      winner
    } = result;

    axios
      .post('http://127.0.0.1:8080/addQuestion', {
        bountyAmount,
        description,
        funder,
        heading,
        id,
        submitDate,
        winner
      })
      .then(res => {
        this.setState({
          qHeading: '',
          qDesc: '',
          bAmount: '',
          success: 'Question Added!',
          loading: '',
          disabled: false
        });
      })
      .catch(e => console.log(e));
    this.setState({ loading: '', disabled: false });
  };

  render() {
    return (
      <React.Fragment>
        <h2>Add a question</h2>

        <div className="form-group">
          <label htmlFor="qHeading">Heading</label>
          <input
            className="form-control"
            id="qHeading"
            name="qHeading"
            onChange={this.handleChange}
            placeholder="Question Heading"
            type="text"
            value={this.state.qHeading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="qDesc">Description</label>
          <input
            className="form-control"
            id="qDesc"
            name="qDesc"
            onChange={this.handleChange}
            placeholder="Question Description"
            type="text"
            value={this.state.qDesc}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bAmount">Bounty Amount</label>
          <input
            className="form-control"
            id="bAmount"
            name="bAmount"
            onChange={this.handleChange}
            placeholder="Bounty Amount in Ether"
            type="number"
            value={this.state.bAmount}
          />
        </div>
        <div className="form-group">
          <input
            className="btn btn-primary"
            onClick={this.handleQuestionSubmit}
            type="button"
            disabled={this.state.disabled}
            value="Submit Question"
          />
          <br />
          {this.state.loading}
          {this.state.success}
        </div>
      </React.Fragment>
    );
  }
}
