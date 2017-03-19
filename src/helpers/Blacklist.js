/**
 * Blacklist Constructor to manage blacklist array
 * stored in chrome storage
 *
 * @return {Object} Blacklist object
 */
class Blacklist {
  constructor() {
    super();
  }

  /**
   * Return the blacklist array from chrome storage
   * (There is no error in callback see documentation
   * https://developer.chrome.com/extensions/storage#type-StorageArea)
   *
   * @return {Array} return array from chrome storage
   */
  get blacklist() {
    return new Promise((resolve) => {
      chrome.storage.sync.get('blacklist', (result) => {
        resolve(result);
      });
    });
  }

  /**
   * Set blacklist array in chrome storage
   *
   * @param {Array} blacklist array of urls to blacklist
   */
  set blacklist(blacklist) {
    return chrome.storage.sync.set(blacklist);
  }

  /**
   * Add url to blacklist array
   *
   * @param {String} url url to blacklist
   */
  addUrlToBlacklist(url) {
    this.blacklist()
      .then(blacklist => this.blacklist(blacklist.push(url)));
  }

  /**
   * Remove a url from blacklist array
   *
   * @param {String} url url to remove from blacklist
   */
  removeUrlFromBlacklist(url) {
    this.blacklist()
      .then(blacklist => this.blacklist(blacklist.pop(url)));
  }
}

module.exports = Blacklist;
