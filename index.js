const fs = require("fs-extra");
const path = require("path");

function buildContractInfo(compilationResult) {
    const sources = compilationResult.sources;
    const keys_sources =  Object.keys(sources)
    // embark might have duplicate source and contracts
    // so we removed all the elements that are from the modules
    const keys_sources_filtered = keys_sources.filter(function(key){ 
        return ! key.startsWith("node_modules"); 
    }); 
    asts_ = {}
    keys_sources_filtered.map((key) => {
        asts_[key] = sources[key].ast
    });

    const contracts = compilationResult.contracts;
    const keys_contracts =  Object.keys(contracts)
    const keys_contracts_filtered = keys_contracts.filter(function(key){ 
        return ! key.startsWith("node_modules"); 
    }); 

    var bytecode_info_ = {}
    var runtime_bytecode_info_ = {}
    var abi_info_ = {}
    keys_contracts_filtered.map((key) => {
        Object.keys(contracts[key]).map((contract_name) =>
            {
                var name = key+":"+contract_name
                runtime_bytecode_info_[name] = contracts[key][contract_name].evm.deployedBytecode.object;
                bytecode_info_[name] = contracts[key][contract_name].evm.bytecode.object;
                abi_info_[name] = contracts[key][contract_name].abi;
            })
    });
    const asts = `${JSON.stringify(asts_, null, 2)}`;
    const runtime_bytecode_info = `${JSON.stringify(runtime_bytecode_info_, null, 2)}`;
    const bytecode_info = `${JSON.stringify(bytecode_info_, null, 2)}`;
    const abi_info = `${JSON.stringify(abi_info_, null, 2)}`;
    return '{\n' +
            '\"asts\":' + asts + ',\n' +
            '\"abis\":' + abi_info + ",\n" +
            '\"init_bytecodes\":' + bytecode_info+ ",\n" +
            '\"runtime_bytecodes\":' + runtime_bytecode_info +
            '\n}';
}

async function run(embark, compilationResult) {
    const dir = "crytic-export"
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    const contractInfoFile = path.join(dir, "contracts.json");
    const contractInfo = buildContractInfo(compilationResult);
    var fd = fs.openSync(contractInfoFile, 'w');
    fs.writeSync(fd, contractInfo);
    fs.closeSync(fd);
}

function register(embark) {
  embark.events.on("contracts:compiled:solc", run.bind(null, embark));
}

module.exports = register;
