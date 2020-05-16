import {
  getWhitelist,
  setWhitelist,
  addUrlToWhitelist,
  removeUrlFromWhitelist,
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
    chrome.storage.local.set({ whitelist: ['https://www.google.com'] });
    await expect(getWhitelist()).resolves.toEqual(['https://www.google.com']);
  });

  it('setWhitelist should set a new whitelist', () => {
    setWhitelist(['wow']);
    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ whitelist: ['wow'] });
  });

  it('addUrlToWhitelist should add a new url to a whitelist', async () => {
    const url = 'https://www.google.com';
    const whitelist = await addUrlToWhitelist(url);

    expect(whitelist).toEqual([url]);
  });

  it('removeUrlFromWhitelist should remove a url from a whitelist', async () => {
    const url = 'https://www.google.com';
    chrome.storage.local.set({ whitelist: [url, 'https://www.github.com'] });
    const whitelist = await removeUrlFromWhitelist(url);

    expect(whitelist).toEqual(['https://www.github.com']);
  });
});
