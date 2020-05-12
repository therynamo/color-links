/* eslint-disable class-methods-use-this */
export default class {
  getWhitelist() {
    return [];
  }

  // @ts-ignore
  setWhitelist() {
    return jest.fn();
  }

  addUrlToWhitelist() {
    return jest.fn();
  }

  removeUrlFromWhitelist() {
    return jest.fn();
  }
}
