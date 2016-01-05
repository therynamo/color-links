'use strict';

var initializeStylesheet = function initializeStylesheet() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'colorLinks');

    document.head.appendChild(styleElement);

    styleElement.sheet.insertRule('a:visited {color: orange}', 0);
};

var getStyleSheet = function getStyleSheet() {
  var styleElement = document.getElementById('colorLinks');
  var styleSheet = (styleElement) ? styleElement.sheet : undefined;

  return styleSheet;
};

var setStyleSheet = function setStyleSheet(color) {
  var styleSheet = getStyleSheet();

  if(styleSheet) {
    styleSheet.deleteRule(0);
    styleSheet.insertRule('a:visited { color:' + color + '}', 0);
  }
};

var colorListener = function colorListener(request, sender, sendResponse) {
  switch (request.color) {
    case 'red':
      setStyleSheet('red')
      break;
    case 'blue':
      setStyleSheet('blue')
      break;
    case 'orange':
      setStyleSheet('orange')
      break;
    default:
      setStyleSheet('orange')
      break;
  }
};

initializeStylesheet();
chrome.runtime.onMessage.addListener(colorListener);
