import React, { Component } from 'react';
import BountyContract from './contracts/Bounty.json';
import getWeb3 from './utils/getWeb3';
import axios from 'axios';
import ListQuestions from './components/ListQuestions';

import './App.css';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    qHeading: '',
    qDesc: '',
    bAmount: ''
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();

      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = BountyContract.networks[networkId];
      const instance = new web3.eth.Contract(
        BountyContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state
      this.setState({ web3, accounts, contract: instance });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.log(error);
    }
  };

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleQuestionSubmit = async () => {
    const { accounts, contract, qHeading, qDesc, bAmount, web3 } = this.state;

    let tx = await contract.methods.addQuestion(qHeading, qDesc).send({
      from: accounts[0],
      value: web3.utils.toWei(bAmount)
    });
    this.setState({
      qHeading: '',
      qDesc: '',
      bAmount: ''
    });

    let qId = tx.events.questionAdded.returnValues.questionCount;
    console.log(qId);

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
        console.log(res.data);
      })
      .catch(e => console.log(e));
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-lg pt-3">
            <h1>Cuora</h1>
            <p>Crypto Quora</p>
            <ListQuestions />
            <h2>Add a question</h2>
            <input
              type="text"
              name="qHeading"
              value={this.state.qHeading}
              placeholder="Question Heading"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="text"
              name="qDesc"
              value={this.state.qDesc}
              placeholder="Question Description"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="number"
              name="bAmount"
              value={this.state.bAmount}
              placeholder="Bounty Amount in Ether"
              onChange={this.handleChange}
            />
            <br />
            <input
              type="button"
              value="Submit Question"
              onClick={this.handleQuestionSubmit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
