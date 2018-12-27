import React, { Component } from 'react';
import BountyContract from './contracts/Bounty.json';
import getWeb3 from './utils/getWeb3';
import truffleContract from 'truffle-contract';

import './App.css';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null,
    qHeading: '',
    qDesc: '',
    bountyAmount: ''
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
    const {
      accounts,
      contract,
      qHeading,
      qDesc,
      bountyAmount,
      web3
    } = this.state;

    let tx = await contract.methods.addQuestion(qHeading, qDesc).send({
      from: accounts[0],
      value: web3.utils.toWei(bountyAmount)
    });
    this.setState({
      qHeading: '',
      qDesc: '',
      bountyAmount: ''
    });

    let qId = tx.events.questionAdded.returnValues.questionCount;
    console.log(qId);

    const result = await contract.methods.getQuestion(qId).call();

    console.log(
      result.bountyAmount,
      result.description,
      result.funder,
      result.heading,
      result.id,
      result.submitDate,
      result.winner
    );
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    return (
      <div className="App">
        <h1>Cuora</h1>
        <p>Crypto Quora</p>
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
          name="bountyAmount"
          value={this.state.bountyAmount}
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
    );
  }
}

export default App;
