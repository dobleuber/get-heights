const {
    getMatchingPropSum,
    getDataFile,
    processData,
    formatOutput,
} = require('./main');

async function main(sum) {
    const data = await getDataFile();
    const dataProcessed = processData(data.values, 'h_in');
    const matchingPropSum = getMatchingPropSum(dataProcessed, sum);
    
    formatOutput(matchingPropSum);
}

if (process.argv.length === 3) {
    if (Number.isNaN(+process.argv[2])) {
        console.error('Parameter should be a number, you entered:', process.argv[2]);
        process.exit(1);
    }
    main(+process.argv[2])
        .then(() => {
            process.exit(0);
        })
        .catch(err => console.error(err));
}