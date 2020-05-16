import uriParser from 'urijs';

export const getActiveColor = () =>
  new Promise<string>((resolve, reject) => {
    chrome.storage.sync.get('color', (results) => {
      if (results.color) {
        resolve(results.color);
      } else {
        reject();
      }
    });
  });

export const getCurrentUrl = () =>
  new Promise<string>((resolve, reject) => {
    chrome.tabs.query({ currentWindow: true, active: true }, (foundTabs) => {
      if (foundTabs.length > 0) {
        const { url = '' } = foundTabs[0];
        const origin = uriParser(url).origin();

        resolve(origin);
      } else {
        reject();
      }
    });
  });

export const saveActiveColor = (color: string) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { color }, () => {});
  });
};

export const reloadCurrentTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (arrayOfTabs) => {
    chrome.tabs.reload(arrayOfTabs[0].id);
  });
};
