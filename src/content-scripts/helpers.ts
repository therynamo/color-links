import { WhiteList } from '../helpers/whitelisting';

interface ColorMessage {
  color: string;
}

export const displayStyles = function displayStyles(
  location: Window['location']
): Promise<WhiteList | undefined> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('whitelist', (result) => {
      const arr: WhiteList[] = result.whitelist && result.whitelist.length ? result.whitelist : [];
      const { origin } = location;
      const isWhitelisted = arr.find((list) => list.url === origin);

      resolve(isWhitelisted);
    });
  });
};

export const initializeStylesheet = function initializeStylesheet(whitelistedUrl: WhiteList) {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('id', 'colorLinks');

  document.head.appendChild(styleElement);

  if (whitelistedUrl.color) {
    (styleElement.sheet as CSSStyleSheet).insertRule(
      `a:visited {color: ${whitelistedUrl.color} !important;}`,
      0
    );
    return;
  }

  chrome.storage.sync.get('color', (results) => {
    if (results.color) {
      (styleElement.sheet as CSSStyleSheet).insertRule(
        `a:visited {color: ${results.color} !important;}`,
        0
      );
      return;
    }
    (styleElement.sheet as CSSStyleSheet).insertRule('a:visited {}', 0);
  });
};

const getStyleSheet = function getStyleSheet() {
  const styleElement = document.getElementById('colorLinks') as HTMLStyleElement;
  const styleSheet = styleElement?.sheet;

  return styleSheet;
};

const setStyleSheet = function setStyleSheet(color: ColorMessage['color']) {
  const styleSheet = getStyleSheet();

  if (styleSheet) {
    (styleSheet as CSSStyleSheet).deleteRule(0);
    (styleSheet as CSSStyleSheet).insertRule(`a:visited { color: ${color} !important;}`, 0);
    chrome.storage.sync.set({ color }, () => {});
  }
};

export const colorListener = function colorListener(request: ColorMessage) {
  const { color } = request ?? {};

  if (color) {
    setStyleSheet(color);
  }

  return true;
};
