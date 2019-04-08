Embark-Contract-Information
==============================

Plugin for [Embark](https://github.com/embark-framework/embark) to generate AST|ABI|Bytecode.
`embark-contract-information` allows the use of Crytic tools, such as:
- [slither](https://github.com/trailofbits/slither)

Installation
============

Globally: 

```npm -g install @trailofbits/embark-contract-info```

Or locally, from your embark dapp directory:

```npm install @trailofbits/embark-contract-info --save```

Usage
=====

Add `@trailofbits/embark-contract-info` to the plugins section in ```embark.json```:

```Json
  "plugins": {
    "@trailofbits/embark-contract-info": {
      "flags": ""
    }
  }
```

Embark will now generate `crytic-export/contracts.json` after each compilation.
The file structure is:
```json
{
    "asts": [],
    "abi": [{"contract_name":...}]
    "init_bytecode": [{"contract_name":...}]
    "runtime_bytecode": [{"contract_name":...}]
}
```

Requirements
============

- Embark 4.0.0 or higher
