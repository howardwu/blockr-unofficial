var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

/* Initialize the blockrAPI object */
function blockrAPI() {
  if (!(this instanceof blockrAPI)) return new blockrAPI();
  var base = 'http://btc.blockr.io/api/v1/';
  return {
    Addresses: Addresses(base),
    Blocks: Blocks(base),
    Transactions: Transactions(base)
  }
}

module.exports = blockrAPI;
