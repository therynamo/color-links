import { getActiveColor, getCurrentUrl, saveActiveColor, reloadCurrentTab } from '../chrome';

describe('chrome helpers >', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('getActiveColor should return an active color if there is one', async () => {
    chrome.storage.local.set({ color: '#f06d06' });

    const color = await getActiveColor();

    expect(chrome.storage.sync.get).toHaveBeenCalledWith('color', expect.any(Function));
    expect(color).toEqual('#f06d06');
    chrome.storage.local.set({ color: null });
  });

  it('getActiveColor should reject if there is no color', async () => {
    await expect(getActiveColor()).rejects.toEqual(undefined);
  });

  it('getCurrentUrl should return a url from the current tab', async () => {
    (chrome.tabs.query as jest.Mock).mockImplementationOnce((keys, cb) => {
      cb([{ url: 'https://www.google.com' }]);
    });

    const url = await getCurrentUrl();

    expect(url).toEqual('https://www.google.com');
  });

  it('getCurrentUrl should reject if no url is open', async () => {
    (chrome.tabs.query as jest.Mock).mockImplementationOnce((keys, cb) => {
      cb([]);
    });

    await expect(getCurrentUrl()).rejects.toEqual(undefined);
  });

  it('saveAcriveColor should send a message with a color', () => {
    const color = 'red';
    saveActiveColor('red');

    expect(chrome.tabs.sendMessage).toHaveBeenCalledWith(
      undefined,
      { color },
      expect.any(Function)
    );
  });

  it('reloadCurrentTab reload current tab', () => {
    (chrome.tabs.query as jest.Mock).mockImplementationOnce((keys, cb) => {
      cb([{ id: 'wow' }]);
    });

    // Reload not included in https://github.com/clarkbw/jest-webextension-mock
    Object.assign(chrome.tabs, {
      reload: jest.fn(),
    });

    reloadCurrentTab();

    expect(chrome.tabs.reload).toHaveBeenCalledWith('wow');
  });
});
