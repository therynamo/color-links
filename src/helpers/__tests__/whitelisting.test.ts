import {
  getWhitelist,
  setWhitelist,
  addUrlToWhitelist,
  removeUrlFromWhitelist,
  modifyWhiteList,
} from '../whitelisting';

describe('whitelist helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
    chrome.storage.local.set({ whitelist: [] });
  });

  it('getWhitelist should return an empty array if there are no existing urls', async () => {
    await expect(getWhitelist()).resolves.toEqual([]);
  });

  it('getWhitelist should return an array of urls if they are present', async () => {
    chrome.storage.local.set({ whitelist: [{ url: 'https://www.google.com', color: '' }] });
    await expect(getWhitelist()).resolves.toEqual([{ url: 'https://www.google.com', color: '' }]);
  });

  it('setWhitelist should set a new whitelist', () => {
    setWhitelist([{ url: 'wow', color: 'red' }]);
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({
      whitelist: [{ url: 'wow', color: 'red' }],
    });
  });

  it('addUrlToWhitelist should add a new url to a whitelist', async () => {
    const url = 'https://www.google.com';
    const whitelist = await addUrlToWhitelist({ url, color: '' });

    expect(whitelist).toEqual([{ url, color: '' }]);
  });

  it('removeUrlFromWhitelist should remove a url from a whitelist', async () => {
    const url = 'https://www.google.com';
    chrome.storage.local.set({
      whitelist: [
        { url, color: '' },
        { url: 'https://www.github.com', color: '' },
      ],
    });
    const whitelist = await removeUrlFromWhitelist(url);

    expect(whitelist).toEqual([{ url: 'https://www.github.com', color: '' }]);
  });

  it('modifyWhiteList should modify an existing whitelist', async () => {
    const url = 'https://www.google.com';
    chrome.storage.local.set({
      whitelist: [
        { url, color: '' },
        { url: 'https://www.github.com', color: '' },
      ],
    });

    const newWhiteList = await modifyWhiteList({ url: 'https://www.github.com', color: 'red' });

    expect(newWhiteList).toEqual([
      { url, color: '' },
      { url: 'https://www.github.com', color: 'red' },
    ]);
  });
});
