const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // included in fs-extra, removes folder and everything inside of it

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

fs.ensureDirSync(buildPath); // creates new directory

for(let contract in output) { // 'for in' used to iterate over the keys of an object
  fs.outputJsonSync(
      path.resolve(buildPath, contract.replace(':', '') + '.json'),
      output[contract]
  );
}