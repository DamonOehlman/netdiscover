var RTCPeerConnection = require('rtc-core/detect')('RTCPeerConnection');

function isHost(parts) {
  return parts[7] === 'host';
}

function extractIP(parts) {
  return parts[4];
}

function split(candidate) {
  return candidate.split(' ');
}

module.exports = function(callback) {
  var pc = new RTCPeerConnection({ iceServers: [] });
  var gathered = [];

  function handleCandidate(evt) {
    if (! evt.candidate) {
      pc.removeEventListener('icecandidate', handleCandidate);
      return callback(null, gathered.map(split).filter(isHost).map(extractIP)[0]);
    }

    gathered.push(evt.candidate.candidate);
  }

  function handleSuccess(desc) {
    pc.setLocalDescription(desc);
  }

  pc.addEventListener('icecandidate', handleCandidate);

  pc.createDataChannel('test');
  pc.createOffer(handleSuccess, callback);
};