var netdiscover = require('../');

netdiscover(function(err, myip) {
  if (err) {
    return console.error('could not discover ip: ', err);
  }

  console.log('my ip: ' + myip);
})