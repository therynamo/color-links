interface ColorMessage {
  color: string;
}

export const displayStyles = function displayStyles(location: Window['location']) {
  return new Promise((resolve) => {
    chrome.storage.sync.get('whitelist', (result) => {
      const arr = result.whitelist && result.whitelist.length ? result.whitelist : [];
      const { origin } = location;
      const isWhitelisted = arr.filter((url: string) => url === origin);

      resolve(!!isWhitelisted.length);
    });
  });
};

export const initializeStylesheet = function initializeStylesheet() {
  const styleElement = document.createElement('style');
  styleElement.setAttribute('id', 'colorLinks');

  document.head.appendChild(styleElement);
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
};
