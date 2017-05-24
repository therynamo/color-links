/**
 * Blacklist Constructor to manage blacklist array
 * stored in chrome storage
 *
 * @return {Object} Blacklist object
 */
class Blacklist {
  /**
   * Return the blacklist array from chrome storage
   * (There is no error in callback see documentation
   * https://developer.chrome.com/extensions/storage#type-StorageArea)
   *
   * @return {Array} return array from chrome storage
   */
  getBlacklist() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('blacklist', (result) => {
        const blacklist = (result.blacklist && result.blacklist.length) ? result.blacklist : [];
        resolve(blacklist);
      });
    });
  }

  /**
   * Set blacklist array in chrome storage
   *
   * @param {Array} blacklist array of urls to blacklist
   */
  setBlacklist(blacklist) {
    return chrome.storage.sync.set({ blacklist });
  }

  /**
   * Add url to blacklist array
   *
   * @param {String} url url to blacklist
   */
  addUrlToBlacklist(url) {
    return this.getBlacklist()
      .then(blacklist => {
        const arr = blacklist.concat([url]);
        this.setBlacklist(arr);
        return arr;
      });
  }

  /**
   * Remove a url from blacklist array
   *
   * @param {String} url url to remove from blacklist
   */
  removeUrlFromBlacklist(url) {
    return this.getBlacklist()
      .then(blacklist => {
        const arr = blacklist.slice();
        arr.pop(url);
        this.setBlacklist(arr);
        return arr;
      });
  }
}

module.exports = Blacklist;
