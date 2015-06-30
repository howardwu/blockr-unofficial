var request = require('request');

/* Returns JSON of Summary information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blockr
 * is valid data for use. */
function Summary(options, callback) {
  if (options.addresses) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      var req = options.base + '/address/info/' + address;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          var data = JSON.parse(body).data;
          if (JSON.parse(body).status === 'success' && data.is_valid) {
            var balance = 100000000 * data.balance;
            var totalReceived = 100000000 * data.totalreceived;
            result.push({
              address: address,
              balance: balance,
              totalReceived: totalReceived,
              totalSent: null,
              txCount: data.nb_txs,
            });
          }
          else {
            console.log('error: ' + JSON.parse(body).message);
          }
          if (count === options.addresses.length - 1) {
            callback(null, result);
          }
          count += 1;
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of Transaction information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blockr
 * is valid data for use. */
function Transactions(options, callback) {
   if (options.addresses) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      var tx = options.base + 'address/txs/' + address;
      request(tx, function (error, response, txs) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(txs).status === 'success') {
            var transactions = JSON.parse(txs).data.txs;
            var addressResult = [];
            transactions.forEach(function (transaction) {
              addressResult.push({
                blockHeight: null,
                blockId: null,
                hex: null,
                txHex: null,
                txid: transaction.tx,
                txId: transaction.tx
              });
            });
            result.push({
              address: address,
              result: addressResult
            });
          }
          else {
            console.log('error: ' + JSON.parse(txs).message);
          }
          if (count === options.addresses.length - 1) {
            callback(null, result);
          }
          count += 1;
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

/* Returns JSON of Unspents information for Addresses. Includes check
 * that addresses are provided and ensures that return from Blockr
 * is valid data for use. */
function Unspents(options, callback) {
  if (options.addresses) {
    var count = 0;
    var result = [];
    options.addresses.forEach(function (address) {
      var req = options.base + 'address/unspent/' + address;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 'success') {
            var unspents = JSON.parse(body).data.unspent;
            var addressResult = [];
            unspents.forEach(function (unspent) {
              var value = unspent.amount * 100000000;
              addressResult.push({
                address: address,
                confirmations: unspent.confirmations,
                txid: unspent.tx,
                txId: unspent.tx,
                value: value,
                amount: value,
                vout: unspent.n,
                scriptPubKey: unspent.script,
              });
            });
            result.push({
              address: address,
              result: addressResult
            });
          }
          else {
            console.log('error: ' + JSON.parse(txs).message);
          }
          if (count === options.addresses.length - 1) {
            callback(null, result);
          }
          count += 1;
        }
        catch (err) {
          callback(err, null);
        }
      });
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

module.exports.Summary = Summary;
module.exports.Transactions = Transactions;
module.exports.Unspents = Unspents;
