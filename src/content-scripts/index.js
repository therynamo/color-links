var setStyleSheet = function setStyleSheet(color, callback) {
  var message = "Color is " + color;
  callback({
    message: message
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    switch (request.color) {
      case 'red':
        setStyleSheet('red', sendResponse)
        break;
      case 'blue':
        setStyleSheet('blue', sendResponse)
        break;
      case 'orange':
        setStyleSheet('orange', sendResponse);
        break;
      default:
        setStyleSheet('orange', sendResponse);
        break;
    }
});
