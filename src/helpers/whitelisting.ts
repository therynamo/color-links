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
export function getWhitelist(): Promise<string[]> {
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
export function setWhitelist(whitelist: string[]) {
  return chrome.storage.sync.set({ whitelist });
}

/**
 * Add url to whitelist array
 *
 * @param {String} url url to whitelist
 */
export async function addUrlToWhitelist(url: string) {
  const whitelist = await getWhitelist();
  const newWhitelist = [...whitelist, url];

  setWhitelist(newWhitelist);

  return newWhitelist;
}

/**
 * Remove url from whitelist array
 *
 * @param {String} url url to remove from whitelist
 */
export async function removeUrlFromWhitelist(url: string) {
  const whitelist = await getWhitelist();
  const newWhitelist = whitelist.filter((u) => u !== url);

  setWhitelist(newWhitelist);
  return newWhitelist;
}
