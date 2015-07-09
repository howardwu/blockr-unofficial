var async = require('async');
var request = require('request');

var Transactions = function (base) {
  /* Returns JSON of a transaction. Includes check that a
   * transaction is provided and ensures that return from Blockr
   * is valid data for use. */
  function Get(options, callback) {
    if (options && base) {
      var transactions = options;
      var result = [];
      async.eachSeries(transactions, function (transaction, cb) {
        setTimeout(function () {
          var req = base + 'tx/info/' + transaction;
          request(req, function (error, response, body) {
            if (error) console.log('error: ' + error);
            try {
              if (JSON.parse(body).status === 'success') {
                console.log("entered");
                var data = JSON.parse(body).data;
                var input = [];
                var output = [];
                var time = new Date(data.time_utc);
                time = time.getTime();
                data.vins.forEach(function (inp) {
                  input.push({
                    txid: inp.vout_tx,
                    txId: inp.vout_tx,
                    vout: inp.n,
                    addresses: [
                      inp.address
                    ],
                    scriptSig: {
                      asm: null,
                      hex: null
                    },
                    sequence: null 
                  });
                });
                data.vouts.forEach(function (out) {
                  var value = out.amount * 100000000;
                  output.push({
                    value: value,
                    index: out.n,
                    n: out.n,
                    spentTxid: null,
                    scriptPubKey:
                    {
                      asm: null,
                      hex: null,
                      reqSigs: null,
                      type: null,
                      addresses: [
                        out.address
                      ]
                    }
                  });
                });
                var fee = data.fee * 100000000;
                result.push({
                  txHex: null,
                  hex : null,
                  txid: data.tx,
                  txId: data.tx,
                  version: null,
                  locktime: null,
                  fee: fee,
                  vin: input,
                  vout: output,
                  blockhash: null,
                  blockindex: data.block,
                  blocktime: null,
                  confirmations: data.confirmations,
                  timeReceived: time, 
                });
              }
              else {
                console.log('error: ' + JSON.parse(body).message);
              }
            }
            catch (err) {
              cb(err, null);
            }
            cb();
          });
        }, 250);
      }, function (err, body) {
        if (err) callback(err, null);
        callback(null, result);
      });
    }
    else {
      callback('error: no txids and/or base provided', null);
    }
  }

  /* Returns JSON of Latest information for Transactions. Ensures that 
   * return from Blockr is valid data for use. */
  function Latest(callback) {
    callback('error: latest not supported by Blockr', null);
  }

  /* Returns JSON of Output information for provided Transaction IDs. Includes
   * check that txids or txIds and vout are provided and ensures that return
   * from Blockr is valid data for use. */
  var base2 = base;
  function Outputs(options, callback) {
    var base = base2;
    if (options && base) {
      var count = 0;
      var result = [];
      var base = base;
      var length = options.length;
      options.forEach(function (opt) {
        if ((opt.txid || opt.txId) && opt.vout >= 0) {
          var transaction;
          if (opt.txid) transaction = opt.txid;
          else transaction = opt.txId;
          var req = base + 'tx/info/' + transaction;
          request(req, function (error, response, body) {
            if (error) callback(error, null);
            try {
              if (JSON.parse(body).status === 'success') {
                var data = JSON.parse(body).data.vouts;
                var blockResult = [];
                data.forEach(function (out) {
                  var value = out.amount * 100000000;
                  result.push({
                    scriptPubKey: null,
                    txid: transaction,
                    txId: transaction,
                    value: value,
                    vout: out.n
                  });
                });
              }
              else {
                console.log('error: ' + JSON.parse(body).message);
              }
              if (count === length - 1) {
                callback(null, result);
              }
              count += 1;
            }
            catch (err) {
              callback(err, null);
            }
          });
        }
        else {
          callback('error: an options parameter is missing', null);
        }
      });
    }
    else {
      callback('error: no outputs or base provided', null);
    }
  }


  /* Propagates a provided Transaction Hex. */
  function Propagate(options, callback) {
    if (options && base) {
      var hex = options;
      var options = {
        url: base + 'tx/push',
        method: 'POST',
        form: {'hex': hex}
      }
      request(options, function (error, response, body) {
        if (error) callback(error, null);
        if (response) {
          callback(null, body)
        }
      })
    } else {
      callback('error: parameters incomplete', null);
    }
  }

  /* Returns JSON of Status information for provided Transaction IDs. Includes
   * check that txids or txIds are provided and ensures that return from Blockr
   * is valid data for use. */
  function Status(options, callback) {
    if (options && base) {
      var transactions = options;
      var count = 0;
      var result = [];
      transactions.forEach(function (transaction) {
        var req = base + 'tx/info/' + transaction;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 'success') {
              var data = JSON.parse(body).data;
              var blockReq = base + 'block/raw/' + data.block;
              request(blockReq, function (error, response, body) {
                if (error) callback(error, null);
                var block = JSON.parse(body).data;
                result.push({
                  blockId: block.hash,
                  txid: transaction,
                  txId: transaction
                });
                if (count === transactions.length - 1) {
                  callback(null, result);
                }
                count += 1;
              });
            }
            else {
              console.log('error: ' + JSON.parse(body).message);
            }
          }
          catch (err) {
            callback(err, null);
          }
        });
      });
    }
    else {
      callback('error: no txids and/or base provided', null);
    }
  }

  return {
    Get: Get,
    Latest: Latest,
    Outputs: Outputs,
    Propagate: Propagate,
    Status: Status
  }
}

module.exports = Transactions;
