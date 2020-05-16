/* eslint-disable class-methods-use-this */

export const getWhitelistMock = jest.fn(() => []);
export const setWhitelistMock = jest.fn();
export const addUrlToWhitelistMock = jest.fn();
export const removeUrlFromWhitelistMock = jest.fn();

const mock = jest.fn().mockImplementation(() => ({
  getWhitelist: getWhitelistMock,
  setWhitelist: setWhitelistMock,
  addUrlToWhitelist: addUrlToWhitelistMock,
  removeUrlFromWhitelist: removeUrlFromWhitelistMock,
}));

export default mock;
