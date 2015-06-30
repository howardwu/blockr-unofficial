var request = require('request');

/* Returns JSON of Get information for Block IDs. Includes check
 * that blockIds are provided and ensures that return from Blockr
 * is valid data for use. */
function Get(options, callback) {
  if (options.blockIds && options.base) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      var req = options.base + 'block/info/' + blockId;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 'success') {
            var data = JSON.parse(body).data;
            result.push({
              blockHex: null,
              blockId: blockId
            });
          }
          else {
            console.log('error: ' + JSON.parse(body).message);
          }
          if (count === options.blockIds.length - 1) {
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

/* Returns JSON of Latest information for Blocks. Ensures that 
 * return from Blockr is valid data for use. */
function Latest(options, callback) {
  if (options.base) {
    var req = options.base + 'block/info/last';
    request(req, function (error, response, body) {
      if (error) callback(error, null);
      try {
        if (JSON.parse(body).status === 'success') {
          var data = JSON.parse(body).data;
          var result = {
            blockHex: null,
            blockId: data.hash
          };
          callback(null, result);
        }
        else {
          console.log('error: ' + JSON.parse(body).message);
        }
      }
      catch (err) {
        callback(err, null);
      }
    });
  }
  else {
    callback('error: no address provided', null);
  }
}

/* Propogates a provided blockHex. Currently Unsupported by Blockr. */
function Propogate(options, callback) {
  callback('error: propogate block to Blockr. unsupported function.', null);
}

/* Returns JSON of Transaction information for provided Block IDs. Includes
 * check that blockIds are provided and ensures that return from Blockr
 * is valid data for use. */
function Transactions(options, callback) {
  if (options.blockIds && options.base) {
    var count = 0;
    var result = [];
    options.blockIds.forEach(function (blockId) {
      var req = options.base + 'block/txs/' + blockId;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 'success') {
            var data = JSON.parse(body).data.txs;
            var txResult = [];
            data.forEach(function (tx) {
              txResult.push({
                txid: tx.tx,
                txId: tx.tx
              });
            });
            result.push({
              blockId: blockId,
              result: txResult
            });
          }
          else {
            console.log('error: ' + JSON.parse(body).message);
          }
          if (count === options.blockIds.length - 1) {
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

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Propogate = Propogate;
module.exports.Transactions = Transactions;
