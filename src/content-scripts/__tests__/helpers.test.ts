import { colorListener, displayStyles, initializeStylesheet } from '../helpers';

const styleElement = document.createElement('style');
styleElement.setAttribute('id', 'colorLinks');

describe('contentscript helpers', () => {
  afterEach(() => {
    jest.clearAllMocks();
    document.head.removeChild(styleElement);
    chrome.storage.local.set({ color: undefined });
  });

  beforeEach(() => {
    document.head.appendChild(styleElement);
    (styleElement.sheet as CSSStyleSheet).insertRule(`a:visited {color: blue !important;}`, 0);
  });

  it('colorListner should set a style sheet when passed a color', () => {
    colorListener({ color: 'red' });

    expect(chrome.storage.sync.set).toHaveBeenCalledWith({ color: 'red' }, expect.any(Function));
  });

  it('colorListner should do nothing when no color is passed', () => {
    // @ts-ignore
    colorListener();

    expect(chrome.storage.sync.set).not.toHaveBeenCalled();
  });

  it('initializeStyleSheet should create a new stylesheet and save a new rule to storage', () => {
    initializeStylesheet();

    const styles = document.getElementById('colorLinks');
    expect(styles.tagName).toEqual('STYLE');
    expect(chrome.storage.sync.get).toHaveBeenCalledWith('color', expect.any(Function));
    // @ts-ignore
    expect(document.styleSheets[0].cssRules[0].selectorText).toEqual('a:visited');
    // @ts-ignore
    expect(document.styleSheets[0].cssRules[0].style.color).toEqual('blue');
  });

  it('initializeStyleSheet should not create a rule if there is no existing color', () => {
    const spyInsert = jest.fn();
    (styleElement.sheet as CSSStyleSheet).insertRule = spyInsert;
    initializeStylesheet();

    expect(spyInsert).not.toHaveBeenCalled();
  });

  it('displayStyles should resolve true if url is whitelisted', async () => {
    chrome.storage.local.set({ whitelist: ['https://www.google.com'] });
    await expect(
      displayStyles({ origin: 'https://www.google.com' } as Window['location'])
    ).resolves.toEqual(true);
  });

  it('displayStyles should resolve false if url is not whitelisted', async () => {
    chrome.storage.local.set({ whitelist: ['https://www.google.com'] });
    await expect(
      displayStyles({ origin: 'https://www.github.com' } as Window['location'])
    ).resolves.toEqual(false);
  });
});
