const fs = require("fs-extra");


function buildContractInfo(compilationResult) {
    const sources = compilationResult.sources;
    const keys_sources =  Object.keys(sources)
    // embark might have dupplicate source and contracts
    // so we removed all the elements that are from the modules
    const keys_sources_filtered = keys_sources.filter(function(key){ 
        return ! key.startsWith("node_modules"); 
    }); 
    const asts = keys_sources_filtered.map((key) => {
	    return `${JSON.stringify(sources[key].ast, null, 2)}`;
    });

    const contracts = compilationResult.contracts;
    const keys_contracts =  Object.keys(contracts)
    const keys_contracts_filtered = keys_contracts.filter(function(key){ 
        return ! key.startsWith("node_modules"); 
    }); 
    const contracts_info = keys_contracts_filtered.map((key) => {
	    return `${JSON.stringify(contracts[key], null, 2)}`;
    });
    return '{\n' + '\"asts\":[' + asts.join("\n,") + '],\n' + '\"contracts-info\":[' + contracts_info.join("\n,") + ']\n}';
}

async function run(embark, compilationResult) {
    const contractInfoFile = "embark.contractInfo.json";
    const contractInfo = buildContractInfo(compilationResult);
    var fd = fs.openSync(contractInfoFile, 'w');
    fs.writeSync(fd, contractInfo);
    fs.closeSync(fd);
}

function register(embark) {
  embark.events.on("contracts:compiled:solc", run.bind(null, embark));
}

module.exports = register;
