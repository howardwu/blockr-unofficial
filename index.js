var Addresses = require('./lib/addresses.js');
var Blocks = require('./lib/blocks.js');
var Transactions = require('./lib/transactions.js');

var BASE_URL = 'http://btc.blockr.io/api/v1/';

/* Initialize the blockrAPI object */
function blockrAPI() {
  if (!(this instanceof blockrAPI)) return new blockrAPI();
}

/* Get Summary, Transactions, and Unspents information
 * for provided Addresses (in array). */
blockrAPI.prototype.Addresses = {
  Summary: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Summary(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Unspents: function (options) {
    options = { addresses: options.addresses, base: BASE_URL };
    Addresses.Unspents(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Block and Transaction information for specified Blocks,
 * get Transactions for specified Blocks, and Propogate to the
 * network a Block by specified blockHex */
blockrAPI.prototype.Blocks = {
  Get: function (options) {
    options = { blockIds: options.blockIds, base: BASE_URL };
    Blocks.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { base: BASE_URL };
    Blocks.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { blockHex: options.blockHex, base: BASE_URL };
    Blocks.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Transactions: function (options) {
    options = { blockIds: options.blockIds, base: BASE_URL };
    Blocks.Transactions(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

/* Get Transaction, Outputs, and Status information for 
 * a specified Transaction. Get latest Transaction and also 
 * propogate a Transaction. */
blockrAPI.prototype.Transactions = {
  Get: function (options) {
    options = { txids: options.txids, txIds: options.txIds, base: BASE_URL };
    Transactions.Get(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Latest: function () {
    var options = { base: BASE_URL };
    Transactions.Latest(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Outputs: function (options) {
    options = { outputs: options.outputs, base: BASE_URL };
    Transactions.Outputs(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Propogate: function (options) {
    options = { hex: options.hex, txHex: options.txHex, base: BASE_URL };
    Transactions.Propogate(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  },
  Status: function (options) {
    options = { txids: options.txids, txIds: options.txIds, base: BASE_URL };
    Transactions.Status(options, function (err, resp) {
      if (err) console.log(err);
      console.log(resp);
    });
  }
}

module.exports = blockrAPI;
