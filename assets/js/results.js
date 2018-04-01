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

// array which stores results.
let resultArr = [];

// returns all candidates
function returnCandidates() {
    return new Promise((resolve, reject) => {
        vote.getCandidates((err, candidates) => {
            if(err) {
                reject(err);
            } else {
                resolve(candidates);
            }
        });
    });
}

// returns no. of votes for particular candidate
function getVotesForCandidate(candidate) {
    return new Promise((resolve, reject) => {
       vote.getVotesforCandidate(candidate, (err, result) => {
           if(err) reject(err);
           resolve(Number('' + result));
       });
    });
}

async function getVotes() {
    let candidates;
    try {
        candidates = await returnCandidates();
    } catch (e) {
        console.log(e);
    }
    for(let i = 0; i < candidates.length; i ++) {
        let no = await getVotesForCandidate(candidates[i]);
        resultArr.push(no);
    }
}

//After getting resultArr call makeChart function.
getVotes().then(() => {
    makeChart(resultArr);
});

// function that prints out chart
function makeChart(arr) {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'bar',

        // The data for our dataset
        data: {
            labels: ["Total Votes"],
            datasets: [{
                label: "Jasna",
                backgroundColor: 'rgb(255, 99, 132)',
                data: [arr[0]],
            },{
                label: "Josip",
                backgroundColor: 'rgb(255, 1, 132)',
                data: [arr[1]],
            },{
                label: "Lovre",
                backgroundColor: 'rgb(255, 0, 2)',
                data: [arr[2]],
            },{
                label: "Mate",
                backgroundColor: 'rgb(1, 99, 132)',
                data: [arr[3]],
            }]
        },

        // Configuration options go here
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}