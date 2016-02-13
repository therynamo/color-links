'use strict';

const initializeStylesheet = function initializeStylesheet() {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('id', 'colorLinks');

  document.head.appendChild(styleElement);
  chrome.storage.sync.get('color', (results) => {
    if (results.color) {
      styleElement.sheet.insertRule('a:visited {color: ' + results.color + '}', 0);
      return;
    }
    styleElement.sheet.insertRule('a:visited {color: orange}', 0);
  });
};

const getStyleSheet = function getStyleSheet() {
  const styleElement = document.getElementById('colorLinks');
  const styleSheet = (styleElement) ? styleElement.sheet : undefined;

  return styleSheet;
};

const setStyleSheet = function setStyleSheet(color) {
  const styleSheet = getStyleSheet();

  if (styleSheet) {
    styleSheet.deleteRule(0);
    styleSheet.insertRule('a:visited { color:' + color + '}', 0);
    chrome.storage.sync.set({ color }, () => {});
  }
};

const colorListener = function colorListener(request, sender, sendResponse) { // eslint-disable-line no-unused-vars
  const color = request.color;

  if (color) {
    setStyleSheet(color);
  }
};

initializeStylesheet();
chrome.runtime.onMessage.addListener(colorListener);
