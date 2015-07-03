var blockrAPI = require('../index.js');

/** GET **/

blockrAPI().Transactions.Get([
  "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
  "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Transactions.Get([
  "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta09"
], function (err, resp) {
  console.log(resp);
});

/** LATEST **/

blockrAPI().Transactions.Latest(function (err, resp) {
  console.log(resp);
});

/** OUTPUTS **/

blockrAPI().Transactions.Outputs([
  {
    vout: 0,
    txId: "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836"
  }
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Transactions.Outputs([
  {
    vout: 0,
    txId: "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta09"
  }
], function (err, resp) {
  console.log(resp);
});

/** PROPAGATE **/

// Invalid Example
blockrAPI().Transactions.Propagate({
  hex: '0100000002d8c8df6a6fdd2addaf589a83d860f18b44872d13ee6ec3526b2b470d42a96d4d000000008b483045022100b31557e47191936cb14e013fb421b1860b5e4fd5d2bc5ec1938f4ffb1651dc8902202661c2920771fd29dd91cd4100cefb971269836da4914d970d333861819265ba014104c54f8ea9507f31a05ae325616e3024bd9878cb0a5dff780444002d731577be4e2e69c663ff2da922902a4454841aa1754c1b6292ad7d317150308d8cce0ad7abffffffff2ab3fa4f68a512266134085d3260b94d3b6cfd351450cff021c045a69ba120b2000000008b4830450220230110bc99ef311f1f8bda9d0d968bfe5dfa4af171adbef9ef71678d658823bf022100f956d4fcfa0995a578d84e7e913f9bb1cf5b5be1440bcede07bce9cd5b38115d014104c6ec27cffce0823c3fecb162dbd576c88dd7cda0b7b32b0961188a392b488c94ca174d833ee6a9b71c0996620ae71e799fc7c77901db147fa7d97732e49c8226ffffffff02c0175302000000001976a914a3d89c53bb956f08917b44d113c6b2bcbe0c29b788acc01c3d09000000001976a91408338e1d5e26db3fce21b011795b1c3c8a5a5d0788ac00000000'
}, function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Transactions.Propagate({
  hex: '186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836'
}, function (err, resp) {
  console.log(resp);
});

/** STATUS **/

blockrAPI().Transactions.Status([
    "186efd8689fc403e5cc6faeef9497fcf177750b52afe55f407244d0c95625836",
    "9375818c85a6712416dac6edd403498180ee9ee0e604bd11ec35beaea384da51"
], function (err, resp) {
  console.log(resp);
});

// Invalid Example
blockrAPI().Transactions.Status([
    "0s9049t4094u093jaie0930ej9a309jra903r0a9w3ur09aw3i903ie093ia09uta"
], function (err, resp) {
  console.log(resp);
});
