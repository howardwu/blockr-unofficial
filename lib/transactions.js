var request = require('request');

/* Returns JSON of a transaction. Includes check that a
 * transaction is provided and ensures that return from Blockr
 * is valid data for use.
 */
function Get(options, callback) {
  if ((options.txids || options.txIds) && options.base) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      var req = options.base + 'tx/info/' + transaction;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 'success') {
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
          if (count === transactions.length - 1) {
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
    callback('error: no txids and/or base provided', null);
  }
}

/* Returns JSON of Latest information for Transactions. Ensures that 
 * return from Blockr is valid data for use. */
function Latest(options, callback) {
  callback('error: latest not supported by Blockr', null);
}

/* Returns JSON of Output information for provided Transaction IDs. Includes
 * check that txids or txIds and vout are provided and ensures that return
 * from Blockr is valid data for use. */
function Outputs(options, callback) {
  if (options.outputs && options.base) {
    var count = 0;
    var result = [];
    var base = options.base;
    var length = options.outputs.length;
    options.outputs.forEach(function (options) {
      if ((options.txid || options.txId) && options.vout >= 0) {
        var transaction;
        if (options.txid) transaction = options.txid;
        else transaction = options.txId;
        var req = base + 'tx/info/' + transaction;
        request(req, function (error, response, body) {
          if (error) callback(error, null);
          try {
            if (JSON.parse(body).status === 'success') {
              var data = JSON.parse(body).data.vouts;
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


/* Propogates a provided Transaction Hex. Currently Unsupported by Blockr. */
function Propogate(options, callback) {
  callback('error: propogate transaction to Blockr. unsupported function.', null);
}

/* Returns JSON of Status information for provided Transaction IDs. Includes
 * check that txids or txIds are provided and ensures that return from Blockr
 * is valid data for use. */
function Status(options, callback) {
  if ((options.txids || options.txIds) && options.base) {
    var transactions;
    if (options.txids) transactions = options.txids;
    else transactions = options.txIds;
    var count = 0;
    var result = [];
    transactions.forEach(function (transaction) {
      var req = options.base + 'tx/info/' + transaction;
      request(req, function (error, response, body) {
        if (error) callback(error, null);
        try {
          if (JSON.parse(body).status === 'success') {
            var data = JSON.parse(body).data;
            var blockReq = options.base + 'block/raw/' + data.block;
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

module.exports.Get = Get;
module.exports.Latest = Latest;
module.exports.Outputs = Outputs;
module.exports.Propogate = Propogate;
module.exports.Status = Status;
