const {
    getMatchingPropSum,
    getDataFile,
    processData,
    getMatchingPairs,
    formatOutput,
} = require('./main');

async function main(sum) {
    const data = await getDataFile();
    const dataProcessed = processData(data.values, 'h_in');
    const matchingPropSum = getMatchingPropSum(dataProcessed, sum);
    
    formatOutput(matchingPropSum);
}

if (process.argv.length === 3) {
    main(+process.argv[2])
        .then(() => {
            process.exit(0);
        })
        .catch(err => console.error(err));
}