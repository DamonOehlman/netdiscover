var netdiscover = require('../');

netdiscover(function(err, myip) {
  console.log(err, myip);
})