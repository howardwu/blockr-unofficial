var request = require('request');

var Blocks = function (base) {
  /* Returns JSON of Get information for Block IDs. Includes check
   * that blockIds are provided and ensures that return from Blockr
   * is valid data for use. */
  function Get(options, callback) {
    if (options && base) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        var req = base + 'block/info/' + blockId;
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
            if (count === options.length - 1) {
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
  function Latest(callback) {
    if (base) {
      var req = base + 'block/info/last';
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

  /* Propagates a provided blockHex. Currently Unsupported by Blockr. */
  function Propagate(options, callback) {
    callback('error: propagate block to Blockr. unsupported function.', null);
  }

  /* Returns JSON of Transaction information for provided Block IDs. Includes
   * check that blockIds are provided and ensures that return from Blockr
   * is valid data for use. */
  function Transactions(options, callback) {
    if (options && base) {
      var count = 0;
      var result = [];
      options.forEach(function (blockId) {
        var req = base + 'block/txs/' + blockId;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 'success') {
              var data = JSON.parse(body).data.txs;
              var txResult = [];
              data.forEach(function (tx) {
                txResult.push({
                  blockId: blockId,
                  txid: tx.tx,
                  txId: tx.tx
                });
              });
              result.push(txResult);
            }
            else {
              console.log('error: ' + JSON.parse(body).message);
            }
            if (count === options.length - 1) {
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

  return {
    Get: Get,
    Latest: Latest,
    Propagate: Propagate,
    Transactions: Transactions
  }
}

module.exports = Blocks;
