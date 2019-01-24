# Cuora

### a Crypto Quora

## What is this

A Question & Answer dApp that allows anyone to post a question and set a bounty reward. Anyone can submit an answer and the question funder can reward the selected answer with the bounty.

The bounty amount is held in escrow by the contract until the question funder selects one answer.

## Quick Start on localhost

Requires Truffle, Ganache, MetaMask

```
npm install -g truffle
npm install -g ganache-cli

git clone https://github.com/dev-bootcamp-2019/final-project-imalexsq

cd final-project-imalexsq && npm install

cd /client && npm install

```

From the main directory /final-project-imalexsq:

```
ganache-cli

truffle compile --all

truffle migrate --reset

```

Start the React dev server

```

cd /client

npm start

```

## Test on Ropsten

Requires Metamask

```
git clone https://github.com/dev-bootcamp-2019/final-project-imalexsq

cd final-project-imalexsq && npm install

cd /client && npm install && npm start
```

Open browser to http://localhost:3000/, set Metamask network to Ropsten. You should see at least one question on the page.
