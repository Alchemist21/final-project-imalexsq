import React, { Component } from 'react';
import BountyContract from './contracts/Bounty.json';
import getWeb3 from './utils/getWeb3';
import ListQuestions from './components/ListQuestions';
import AddQuestion from './components/AddQuestion';

import './App.css';

class App extends Component {
  state = {
    web3: null,
    accounts: null,
    contract: null
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

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { accounts, contract, web3 } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-lg pt-3">
            <h1>Cuora</h1>
            <p>Crypto Quora</p>
            <p>Logged in as {accounts[0]}</p>
            <ListQuestions
              accounts={accounts}
              contract={contract}
              utils={web3.utils}
            />
            <AddQuestion
              account={accounts[0]}
              contract={contract}
              utils={web3.utils}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
