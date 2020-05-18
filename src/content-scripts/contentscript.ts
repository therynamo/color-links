import { colorListener, displayStyles, initializeStylesheet } from './helpers';

displayStyles(window.location)
  .then((urls) => {
    if (!urls) return;

    initializeStylesheet();
    chrome.runtime.onMessage.addListener(colorListener);
  })
  .catch((err) => console.log(err));
