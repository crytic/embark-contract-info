const fs = require("fs-extra");

function buildAstData(sources) {
  const header = "JSON AST (compact format):\n";
  const data = Object.keys(sources).map((key) => {
    return `
======= ${key} =======

${JSON.stringify(sources[key].ast, null, 2)}
`;
  });
  return header + data.join("\n");
}

async function run(embark, compilationResult) {
    const astFile = "embark.ast.json";
    const astData = buildAstData(compilationResult.sources);
    fs.openSync(astFile, 'w');
    fs.writeFileSync(astFile, astData);
    fs.closeSync(astFile);
}

function register(embark) {
  embark.events.on("contracts:compiled:solc", run.bind(null, embark));
}

module.exports = register;
