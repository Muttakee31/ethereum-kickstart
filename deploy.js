const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, bytecode} = require('./compile');

const provider = new HDWalletProvider(
    'man hair melody legal drastic few illegal phrase trick negative grace juice',
    'https://rinkeby.infura.io/v3/7b5ccc40b4254532b07f0a482e1a5d0f');

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  console.log('deploying from ' + accounts[0]);
  const result = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode
  }).send({from: accounts[0], gas: '1000000'});
  console.log(result.options.address);
}

deploy();