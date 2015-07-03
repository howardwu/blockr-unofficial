var blockrAPI = require('../index.js');

/** SUMMARY **/

blockrAPI().Addresses.Summary([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Addresses.Summary([
  "abcdefghijklmnopqrstuvxyz1234567890"
], function (err, resp) {
  console.log(resp);
});

/** TRANSACTIONS **/

blockrAPI().Addresses.Transactions([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Addresses.Transactions([
  "abcdefghijklmnopqrst"
], function (err, resp) {
  console.log(resp);
});

/** UNSPENTS **/

blockrAPI().Addresses.Unspents([
  "1HUTmSsFp9Rg4FYRftp85GGyZFEndZSoeq",
  "1DmUeGjuQWLHxq5jhyn3uPCD9N16Ar9xGw"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Addresses.Unspents([
  "asdfghjkl"
], function (err, resp) {
  console.log(resp);
});
