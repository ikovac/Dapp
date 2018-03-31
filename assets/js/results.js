// garbage dream earth sail rate sport crime cliff inherit crop useless burst

const utils = require('web3/lib/utils/utils');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

const voteContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"getVotesforCandidate","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"candidateIsValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);

let vote = voteContract.at("0x39d24716607d153e0397b25f253595b8d5d6c5bc");

vote.getCandidates((err, candidates) => {
    if(err) {
        console.log(err);
    } else {
        candidates.forEach(candidate => {

            vote.getVotesforCandidate(candidate, (err, result) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log(utils.toUtf8(candidate) + ': ' + result);
                }
            });
        });
    }
});