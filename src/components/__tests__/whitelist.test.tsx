/* eslint-disable import/named */
import React from 'react';
import { render, act, RenderResult, waitFor, fireEvent } from '@testing-library/react';
import * as chromeHelpers from '../../helpers/chrome';
import {
  // @ts-ignore
  getWhitelistMock,
  // @ts-ignore
  addUrlToWhitelistMock,
  // @ts-ignore
  removeUrlFromWhitelistMock,
} from '../../helpers/Whitelist';

import WhitelistManager from '../whitelist';

jest.spyOn(chromeHelpers, 'getCurrentUrl');
jest.mock('../../helpers/Whitelist.ts');

describe('WhitelistManager', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should show inactive when there is no active url', async () => {
    let utils = {} as RenderResult;
    const url = 'https://www.google.com';

    (chromeHelpers.getCurrentUrl as jest.Mock).mockResolvedValueOnce(url);

    act(async () => {
      utils = render(<WhitelistManager />);
    });

    const { getByTestId, getByText } = utils;
    await waitFor(() => expect(getByTestId('whitelist-checkbox')).toBeInTheDocument());

    expect(getByTestId('whitelist-checkbox')).not.toBeChecked();
    await waitFor(() => expect(getByText(url)).toBeInTheDocument());
  });

  it('should show active when there is an active url', async () => {
    let utils = {} as RenderResult;
    const url = 'https://www.google.com';

    (chromeHelpers.getCurrentUrl as jest.Mock).mockResolvedValueOnce(url);
    getWhitelistMock.mockResolvedValueOnce([url]);

    act(async () => {
      utils = render(<WhitelistManager />);
    });

    const { getByTestId, getByText } = utils;
    await waitFor(() => expect(getByTestId('whitelist-checkbox')).toBeChecked());
    await waitFor(() => expect(getByText(url)).toBeInTheDocument());
  });

  it('should add a url to the whitelist when clicked', async () => {
    let utils = {} as RenderResult;
    const url = 'https://www.google.com';

    (chromeHelpers.getCurrentUrl as jest.Mock).mockResolvedValueOnce(url);
    (chromeHelpers.reloadCurrentTab as jest.Mock) = jest.fn();

    act(async () => {
      utils = render(<WhitelistManager />);
    });

    const { getByTestId } = utils;
    await waitFor(() => expect(chromeHelpers.getCurrentUrl).toHaveBeenCalled());

    fireEvent.click(getByTestId('whitelist-checkbox'));

    await waitFor(() => expect(addUrlToWhitelistMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(addUrlToWhitelistMock).toHaveBeenCalledWith(url));
  });

  it('should remove a url from the whitelist when clicked', async () => {
    let utils = {} as RenderResult;
    const url = 'https://www.google.com';

    (chromeHelpers.getCurrentUrl as jest.Mock).mockResolvedValueOnce(url);
    (chromeHelpers.reloadCurrentTab as jest.Mock) = jest.fn();
    getWhitelistMock.mockResolvedValueOnce([url]);

    act(async () => {
      utils = render(<WhitelistManager />);
    });

    const { getByTestId } = utils;
    await waitFor(() => expect(chromeHelpers.getCurrentUrl).toHaveBeenCalled());

    fireEvent.click(getByTestId('whitelist-checkbox'));

    await waitFor(() => expect(removeUrlFromWhitelistMock).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(removeUrlFromWhitelistMock).toHaveBeenCalledWith(url));
  });
});
