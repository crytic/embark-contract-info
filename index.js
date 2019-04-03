const fs = require("fs-extra");

function buildContractInfo(embark) {
    const sources = embark.sources;
    const contracts = embark.contracts;
    const data1 = Object.keys(sources).map((key) => {
	return `${JSON.stringify(sources[key].ast, null, 2)}`;
    });
    const data2 = Object.keys(contracts).map((key) => {
	return `${JSON.stringify(contracts[key], null, 2)}`;
    });
    return '{\n' + '\"embark-asts\":' + data1.join("\n") + ',\n' + '\"embark-other\":' + data2.join("\n") + '\n}';
}

async function run(embark, compilationResult) {
    const contractInfoFile = "embark.contractInfo.json";
    const contractInfo = buildContractInfo(compilationResult);
    fs.openSync(contractInfoFile, 'w');
    fs.writeFileSync(contractInfoFile, contractInfo);
    fs.closeSync(contractInfoFile);
}

function register(embark) {
  embark.events.on("contracts:compiled:solc", run.bind(null, embark));
}

module.exports = register;
