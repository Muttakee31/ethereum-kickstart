const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const {describe} = require("mocha");
const {interface, bytecode} = require('../compile');

const web3 = new Web3(ganache.provider());

let accounts;
let inbox;
let INITIAL_STRING = "Hi There!";


beforeEach(async ()=> {
  // get a list of all accounts
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface)).deploy({
    data: bytecode, arguments: [INITIAL_STRING]
  }).send({from: accounts[0], gas: '1000000'});
})

describe('Inbox', () => {
  it('deploys a contract', async () => {
    assert.ok(inbox.options.address);
    const message = await inbox.methods.message().call();
    console.log(message);
    assert.strictEqual(message, INITIAL_STRING);
    //assert.strictEqual(car.park(), 'stopped');
  })
})