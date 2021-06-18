import Web3 from 'web3';

let web3;
if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
}
else {
  const provider = new Web3.providers.HttpProvider(
      'https://rinkeby.infura.io/v3/7b5ccc40b4254532b07f0a482e1a5d0f');
  web3 = new Web3(provider);
}

export default web3;