import { colorListener, displayStyles, initializeStylesheet } from './helpers';

displayStyles(window.location)
  .then((whiteListItem) => {
    if (!whiteListItem) return;

    initializeStylesheet(whiteListItem);
    chrome.runtime.onMessage.addListener(colorListener);
  })
  .catch((err) => console.log(err));
