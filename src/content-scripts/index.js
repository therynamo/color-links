'use strict';

var initializeStylesheet = function initializeStylesheet() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'colorLinks');

    document.head.appendChild(styleElement);
    chrome.storage.sync.get('color', function(results) {
      if(results.color) {
        styleElement.sheet.insertRule('a:visited {color: ' + results.color + '}', 0);
        return;
      }
      styleElement.sheet.insertRule('a:visited {color: orange}', 0);
    });
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
    chrome.storage.sync.set({color: color}, function() {
      console.log('set color to ', color)
    })
  }
};

var colorListener = function colorListener(request, sender, sendResponse) {
  var color = request.color;

  if(color) {
    setStyleSheet(color);
  }
};

initializeStylesheet();
chrome.runtime.onMessage.addListener(colorListener);
