const path = require('path');
var HDWalletProvider = require('truffle-hdwallet-provider');
var mnemonic =
  'famous call liquid cool paddle exist impose sadness wear tackle portion during rough bag erosion';

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          'https://ropsten.infura.io/adf80880c9074524a08e44291a78f9e4'
        );
      },
      network_id: 3
    }
  },
  contracts_build_directory: path.join(__dirname, 'client/src/contracts')
};
