const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
const json = require('./../build/contracts/copyright.json');
let accounts;
let userAddress;
let userId;
const interface = json['abi'];
const bytecode = json['bytecode'];

describe('copyright', () => {
  beforeEach(async () => {

    accounts = await web3.eth.getAccounts();
    userAddress = accounts[0];
    copyright = await new web3.eth.Contract(interface)
        .deploy({ data: bytecode })
        .send({ from: userAddress, gas: '4600000' });
  });
  it('register user',async() =>{
    try{
    copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' });
  }
  catch(err){
    assert(err);
  }

  })
  it('register User with same id', async () => {
    userAddress2=accounts[1];
    try{
    copyright.methods.registerUser("1","user",userAddress).send({ from: userAddress, gas: '4600000' })
    copyright.methods.registerUser("1","user2",userAddress2).send({ from: userAddress2, gas: '4600000' })
    assert(false)
    }
    catch(err){
      assert(err)
    }
    });

});
