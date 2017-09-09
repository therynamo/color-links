/**
 * Whitelist Constructor to manage whitelist array
 * stored in chrome storage
 *
 * @return {Object} Whitelist object
 */
class Whitelist {
  /**
   * Return the whitelist array from chrome storage
   * (There is no error in callback see documentation
   * https://developer.chrome.com/extensions/storage#type-StorageArea)
   *
   * @return {Array} return array from chrome storage
   */
  getWhitelist() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('whitelist', (result) => {
        const whitelist = (result.whitelist && result.whitelist.length) ? result.whitelist : [];
        resolve(whitelist);
      });
    });
  }

  /**
   * Set whitelist array in chrome storage
   *
   * @param {Array} whitelist array of urls to whitelist
   */
  setWhitelist(whitelist) {
    return chrome.storage.sync.set({ whitelist });
  }

  /**
   * Add url to whitelist array
   *
   * @param {String} url url to whitelist
   */
  addUrlToWhitelist(url) {
    return this.getWhitelist()
      .then(whitelist => {
        const arr = whitelist.concat([url]);
        this.setWhitelist(arr);
        return arr;
      });
  }

  /**
   * Remove a url from whitelist array
   *
   * @param {String} url url to remove from whitelist
   */
  removeUrlFromWhitelist(url) {
    return this.getWhitelist()
      .then(whitelist => {
        const arr = whitelist.slice();
        arr.pop(url);
        this.setWhitelist(arr);
        return arr;
      });
  }
}

module.exports = Whitelist;
