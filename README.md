Embark-Contract-Information
==============================

Plugin for [Embark](https://github.com/embark-framework/embark) to generate AST|ABI|Bytecode information containing file (for analyzing solidity source with [slither](https://github.com/trailofbits/slither) or other uses)

Installation
============

In your embark dapp directory:

```npm install embark-contract-info --save```

then add embark-contract-info to the plugins section in ```embark.json```:

```Json
  "plugins": {
    "embark-contract-info": {
      "flags": ""
    }
  }
```

Embark will now generate AST|ABI|bytecode containing file in embark.contractInfo.json after each compilation.

Requirements
============

- Embark 4.0.0 or higher
