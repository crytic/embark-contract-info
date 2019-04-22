Embark-Contract-Information
==============================

Plugin for [Embark](https://github.com/embark-framework/embark) to generate AST|ABI|Bytecode.
`embark-contract-information` allows the use of Crytic tools, such as:
- [Slither](https://github.com/crytic/slither)
- [Echidna](https://github.com/crytic/echidna)
- [Manticore](https://github.com/trailofbits/manticore/)
- [evm-cfg-builder](https://github.com/crytic/evm_cfg_builder)

See [`crytic-compile`](https://github.com/crytic/crytic-compile) for more details.

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
    "contracts": [
        "/path:contract_name":
        {
            "abi": [{"/path:contract_name":...}]
            "bin": ..
            "bin-runtime": ..
        }
}
```

Requirements
============

- Embark 4.0.0 or higher
