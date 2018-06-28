// import Web3 from 'web3';
//
// const provider = new Web3.providers.HttpProvider(
//     'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
// );
// let web3 = new Web3(provider);
//
// export default web3;

const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
    'vessel tilt bronze rifle invite between material section scheme lawn undo blue',
    'https://rinkeby.infura.io/orDImgKRzwNrVCDrAk5Q'
);
const web3 = new Web3(provider);

export default web3;
