const displayStyles = function displayStyles(location) {
  return new Promise((resolve) => {
    chrome.storage.sync.get("whitelist", (result) => {
      const arr =
        result.whitelist && result.whitelist.length ? result.whitelist : [];
      const { origin } = location;
      const isWhitelisted = arr.filter((url) => url === origin);

      resolve(isWhitelisted.length);
    });
  });
};

const initializeStylesheet = function initializeStylesheet() {
  const styleElement = document.createElement("style");
  styleElement.setAttribute("id", "colorLinks");

  document.head.appendChild(styleElement);
  chrome.storage.sync.get("color", (results) => {
    if (results.color) {
      styleElement.sheet.insertRule(
        "a:visited {color: " + results.color + ";}",
        0
      );
      return;
    }
    styleElement.sheet.insertRule("a:visited {}", 0);
  });
};

const getStyleSheet = function getStyleSheet() {
  const styleElement = document.getElementById("colorLinks");
  const styleSheet = styleElement ? styleElement.sheet : undefined;

  return styleSheet;
};

const setStyleSheet = function setStyleSheet(color) {
  const styleSheet = getStyleSheet();

  if (styleSheet) {
    styleSheet.deleteRule(0);
    styleSheet.insertRule("a:visited { color:" + color + "}", 0);
    chrome.storage.sync.set({ color }, () => {});
  }
};

const colorListener = function colorListener(request, sender, sendResponse) {
  // eslint-disable-line no-unused-vars
  const color = request.color;

  if (color) {
    setStyleSheet(color);
  }
};

displayStyles(window.location)
  .then((urls) => {
    if (!urls) return;

    initializeStylesheet();
    chrome.runtime.onMessage.addListener(colorListener);
  })
  .catch((err) => console.log(err));
