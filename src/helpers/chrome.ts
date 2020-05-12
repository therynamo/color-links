import uriParser from 'urijs';

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

export const reloadCurrentTab = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (arrayOfTabs) => {
    chrome.tabs.reload(arrayOfTabs[0].id);
  });
};
