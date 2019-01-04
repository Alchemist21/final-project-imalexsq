# Cuora

### a Crypto Quora

## What is this

A Question & Answer dApp that allows anyone to post a question and set a bounty reward. Anyone can submit an answer and the question funder can reward the selected answer with the bounty.

The bounty amount is held in escrow by the contract until the question funder selects one answer.

## Quick Start

Requires Truffle, Ganache MetaMask and MongoDB

For MongoDB visit https://docs.mongodb.com/manual/installation/

```
npm install -g truffle
npm install -g ganache-cli

```

The project has three separate parts, the main directory, /server and /client. Each has its own package.json

```
git clone https://github.com/dev-bootcamp-2019/final-project-imalexsq

cd final-project-imalexsq && npm install

cd server/ && npm install

cd ../client && npm install

```

Open Ganache, then from the main directory /final-project-imalexsq

```
truffle compile --all

truffle migrate --reset
```

Start the Express server

```
cd server/
npm start
```

Start the React dev server

```
cd ../client

npm start
```
