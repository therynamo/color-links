export interface WhiteList {
  url: string;
  color: string;
}

/**
 * Whitelist Constructor to manage whitelist array
 * stored in chrome storage
 */

/**
 * Return the whitelist array from chrome storage
 * (There is no error in callback see documentation
 * https://developer.chrome.com/extensions/storage#type-StorageArea)
 *
 * @return {Array} return array from chrome storage
 */
export function getWhitelist(): Promise<WhiteList[]> {
  return new Promise((resolve) => {
    chrome.storage.sync.get('whitelist', (result) => {
      const whitelist = result.whitelist && result.whitelist.length ? result.whitelist : [];
      resolve(whitelist);
    });
  });
}

/**
 * Set whitelist array in chrome storage
 *
 * @param {Array} whitelist array of urls to whitelist
 */
export function setWhitelist(whitelist: WhiteList[]) {
  return chrome.storage.sync.set({ whitelist });
}

/**
 * Modify a given whitelist
 * @param whiteList
 */
export async function modifyWhiteList({ url, color }: WhiteList) {
  const existingWhiteList = await getWhitelist();
  const listWithoutCurrentItem = existingWhiteList.filter((item) => item.url !== url);

  const newWhitelist = [...listWithoutCurrentItem, { url, color }];

  setWhitelist(newWhitelist);

  return newWhitelist;
}

/**
 * Add url to whitelist array
 *
 * @param {String} url url to whitelist
 */
export async function addUrlToWhitelist(whiteList: WhiteList) {
  const existingWhiteList = await getWhitelist();
  const newWhitelist = [...existingWhiteList, whiteList];

  setWhitelist(newWhitelist);

  return newWhitelist;
}

/**
 * Remove url from whitelist array
 *
 * @param {String} url url to remove from whitelist
 */
export async function removeUrlFromWhitelist(url: string) {
  const existingWhiteList = await getWhitelist();
  const newWhitelist = existingWhiteList.filter((list) => list.url !== url);

  setWhitelist(newWhitelist);
  return newWhitelist;
}
