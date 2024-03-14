const contract = require('./VotingContract.json'); 
const { Web3 } = require('web3');
const web3 = new Web3(window.ethereum);


const CONTRACT_ADDRESS = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
const CONTRACT_ABI = contract.abi;

export const votingContract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
