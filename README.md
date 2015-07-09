# blockr-unofficial

[![Version](http://img.shields.io/npm/v/blockr-unofficial.svg)](https://www.npmjs.org/package/blockr-unofficial)

A Blockr adapter built to standardize requests to follow the common-blockchain convention. Aliases are introduced in the return of functions to account for differences in convention between the two standards. It is our hope that the Bitcoin community will come to an agreement on proper style and convention for requests on addresses, transactions, and blocks. 

[Information on common-blockchain for convention](https://github.com/common-blockchain/common-blockchain/blob/master/README.md)

## Installation

Install as you normally install an npm module:
```
  npm install blockr-unofficial
```

## Usage

Blockr only supports Bitcoin Mainnet. There is no Testnet support in this package.

To use the Blockr API, simply require the module.
```javascript
  var blockrAPI = require('blockr-unofficial');
  var commonBlockchain = blockrAPI();
```

## API

[See abstract-common-blockchain for API](https://github.com/blockai/abstract-common-blockchain/blob/master/README.md)

## Test

Run ``` npm test ``` to have [abstract-common-blockchain](https://github.com/blockai/abstract-common-blockchain/blob/master/README.md) run a suite of tests on Addresses, Blocks, and Transactions. The tests are comprehensive with complete code coverage - see documentation in abstract-common-blockchain for further details.

## Examples

There are examples for using Addresses, Blocks, and Transactions, provided in the /examples folder. Each function includes a Mainnet and, where possible, an invalid example is provided to show error handling. Expect all returns to be of the form (error, response).

## Convention

Standard convention is described fully by common-blockchain in the ```types.json``` file: https://github.com/blockai/common-blockchain/blob/master/types.json

## Maintainers
  * Howard Wu (howardwu) - howardwu@berkeley.edu
  * Andrew Malta (andrewmalta13) - andrew.malta@yale.edu
