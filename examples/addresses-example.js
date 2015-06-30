var blockrAPI = require('../index.js');

/** SUMMARY **/

blockrAPI().Addresses.Summary({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq", "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  console.log(resp);
});

blockrAPI().Addresses.Summary({
  addresses: ["abcdefghijklmnopqrstuvxyz1234567890"]
}, function (err, resp) {
  console.log(resp);
});


/** TRANSACTIONS **/

blockrAPI().Addresses.Transactions({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  console.log(resp);
});

blockrAPI().Addresses.Transactions({
  addresses: [
    "abcdefghijklmnopqrst"
  ]
}, function (err, resp) {
  console.log(resp);
});


/** UNSPENTS **/

blockrAPI().Addresses.Unspents({
  addresses: [
    "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
    "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
  ]
}, function (err, resp) {
  console.log(resp);
});

blockrAPI().Addresses.Unspents({
  addresses: [
    "asdfghjkl"
  ]
}, function (err, resp) {
  console.log(resp);
});
