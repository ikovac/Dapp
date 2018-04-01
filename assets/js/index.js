// garbage dream earth sail rate sport crime cliff inherit crop useless burst

const utils = require('web3/lib/utils/utils');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
} else {
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
}

web3.eth.defaultAccount = web3.eth.accounts[0];

const voteContract = web3.eth.contract([{"constant":true,"inputs":[],"name":"getCandidates","outputs":[{"name":"","type":"bytes32[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"getVotesforCandidate","outputs":[{"name":"","type":"int256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"voteForCandidate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"candidateName","type":"bytes32"}],"name":"candidateIsValid","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"candidateNames","type":"bytes32[]"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);

let vote = voteContract.at("0x306f60f029a284237e081bdcf1972658f32e0a42");

// First step. Validate address and redirect to the voting page.
// @var votingAddress stores valid address for later use.
let votingAddress;

// Get all candidates from a contract and add them to the page.
const votingDiv = document.getElementById('voting-part');
vote.getCandidates((err, candidates) => {
    if(err) {
        console.log(err);
    } else {
        candidates.forEach(candidate => {

            let candName = utils.toUtf8(candidate);
            let temp = document.getElementById('candidate-template');
            let candElement = document.importNode(temp.content, true);
            let h3 = candElement.querySelector('h3');
            h3.innerHTML = candName;
            let img = candElement.querySelector('img');
            img.src = './assets/img/' + candName.toLowerCase() + '.jpg';
            img.alt = candName;

            candElement.childNodes[1].onclick = onCandidateClick;

            votingDiv.appendChild(candElement);

        });
    }
});

function onCandidateClick(e) {
    let candidate = e.currentTarget;
    let name = candidate.querySelector('h3').innerHTML;

    //let inpAdr = document.getElementById('voting-address');

    //if(web3.eth.accounts.includes(inpAdr.value)) {
        //votingAddress = inpAdr.value;

        if(confirm("Do you really want vote for " + name)) {
            // incrementing votes for that candidate
            vote.voteForCandidate(name);

            // redirect to result page after voting.
            location.href = './seetheresults.html';
        //}

    } else {
        // display error message
        let errMsgBlock = document.getElementById('voting-address-error');
        errMsgBlock.style.display = 'block';
        setTimeout(() => {
            errMsgBlock.style.display = 'none';
        }, 5000);
    }
}
