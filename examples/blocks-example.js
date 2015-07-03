var blockrAPI = require('../index.js');

/** GET **/

blockrAPI().Blocks.Get([
  "00000000000000000216a936ebc1962e319a51bab8d3eae69335ac940284491d",
  "00000000000000001034f207d3ce18f03054ddfb0e4dba712f5b76cb1cda9499"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Blocks.Get([
  "29384792387042379481703948710983749018374098137409817304987139"
], function (err, resp) {
  console.log(resp);
});

/** LATEST **/

blockrAPI().Blocks.Latest(function (err, resp) {
  console.log(resp);
});

/** PROPAGATE **/

blockrAPI().Blocks.Propagate({
  blockHex: ''
}, function (err, resp) {
  console.log(resp);
});

/** TRANSACTIONS **/

blockrAPI().Blocks.Transactions([
  "0000000000000c7f878cf71e5a6c87592c7c1982748e4f54b968b7b0c4cd324d"
], function (err, resp) {
  console.log(resp);
});
