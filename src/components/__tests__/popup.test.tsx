import React from 'react';
import {
  render,
  RenderResult,
  waitFor,
  fireEvent
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as chromeHelpers from '../../helpers/chrome';
import { COLORS } from '../../constants/colors';
import Popup from '../popup';

jest.mock('../../helpers/chrome.ts');
jest.mock('../../helpers/whitelisting.ts');

describe('Popup', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should retreieve an active color and not show custom input when found', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { queryAllByLabelText, getByTestId, getAllByTestId } = utils;

    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(COLORS[0]);

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const colorButtons = getAllByTestId('color button');
    const whiteList = queryAllByLabelText('whitelist toggle');

    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(whiteList.length).toEqual(1);
  });

  it('should save a color when a color button is clicked', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { queryAllByLabelText, getAllByTestId } = utils;
    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(COLORS[0]);

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const colorButtons = getAllByTestId('color button');
    const customForm = queryAllByLabelText('custom form');

    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(customForm.length).toEqual(0);

    fireEvent.click(colorButtons[1]);

    expect(colorButtons[0]).toHaveClass('colorLinks--button');
    expect(colorButtons[1]).toHaveClass('colorLinks--button active');
  });
});
