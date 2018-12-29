import React from 'react';
import axios from 'axios';

export default class AddAnswer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      aDesc: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleAnswerSubmit = async () => {
    const { aDesc } = this.state;
    const { contract, account, qId } = this.props;

    let tx = await contract.methods
      .addAnswer(qId, aDesc)
      .send({ from: account });
    let aId = tx.events.answerAdded.returnValues.id;

    axios
      .post('http://127.0.0.1:8080/addAnswer', {
        qId,
        aId,
        aDesc,
        account
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => console.log(err));

    this.setState({ aDesc: '' });
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
              onClick={this.handleAnswerSubmit}
            >
              Button
            </button>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
