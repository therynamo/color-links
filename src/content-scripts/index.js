chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  switch (request.color) {
    case 'red':
      setStyleSheet('red',sendResponse)
      break;
    case 'blue':
      setStyleSheet('blue',sendResponse)
      break;
    case 'orange':
      setStyleSheet('orange',sendResponse);
      break;
    default:
      setStyleSheet('orange',sendResponse);
      break;
  }
});

var setStyleSheet = function setStyleSheet(color, sendResponse) {
  var message = "Color is " + color;
  sendResponse({
    message: message
  })
}
