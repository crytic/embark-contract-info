Embark-AST
======

Plugin for [Embark](https://github.com/embark-framework/embark) to generate AST|ABI|Bytecode containing file (for analyzing solidity source with [slither](https://github.com/trailofbits/slither) or other uses)

Installation
======

In your embark dapp directory:

```npm install embark-ast --save```

or if using `yarn`:

```yarn add embark-ast```

then add embark-ast to the plugins section in ```embark.json```:

```Json
  "plugins": {
    "embark-ast": {
      "flags": ""
    }
  }
```

Embark will now generate AST|ABI|bytecode containing file in embark.contractData.json after each compilation.

Requirements
======

- Embark 4.0.0 or higher
