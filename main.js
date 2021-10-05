
const fetch = require('cross-fetch');
require('dotenv').config()

const {ENDPOINT_URL} = process.env;

function getMatchingPairs(values, sum) {
    const result = [];
    for(let i = 0; i < values.length - 1; i++) {
        const val = values[i];
        const rest = sum - val;

        if (values.slice(i).includes(rest)) {
            result.push([val, rest]);
        }
    }

    return result;
}

function getMatchingPropSum(data, sum) {
    const {keys, players} = data;
    const result = [];
    if (sum < keys[0] || sum < keys[0] * 2) {
        return result;
    }

    if (sum > keys[keys.length - 1] * 2) {
        return result;
    }

    const matchingPairs = getMatchingPairs(keys, sum);
    console.log(`Found ${matchingPairs.length} matching pairs`);
    
    matchingPairs.forEach(([v1, v2]) => {
        players[v1].forEach(p1 => {
            players[v2].forEach(p2 => {
                if (p1.first_name !== p2.first_name && p1.last_name !== p2.last_name) {
                    result.push([
                        `${p1.first_name} ${p1.last_name}`,
                        `${p2.first_name} ${p2.last_name}`
                    ]);
                }
            });
        })
    });

    return result;
}

async function getDataFile() {
    const data = await fetch(ENDPOINT_URL);
    return data.json();
}

function processData(data, prop) {
    const keys = new Set();
    const players = {};
    data.forEach(item => {
        const value = +item[prop];
        if (Number.isNaN(value)) {
            return;
        }
        keys.add(value);
        if (!players[value]) {
            players[value] = []
        }
        players[value].push(item);
    });

    const result = {
        keys: [...keys].sort(),
        players,
    };

    return result;
}

function formatOutput(pairs) {
    if(pairs.length === 0) {
        console.log('No matches found');
        return;
    }

    pairs.forEach(([p1, p2]) => console.log(`- ${p1}\t\t${p2}`));
}

module.exports = {
    getMatchingPropSum,
    getDataFile,
    processData,
    getMatchingPairs,
    formatOutput,
};