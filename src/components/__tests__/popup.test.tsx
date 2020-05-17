import React from 'react';
import {
  render,
  RenderResult,
  waitFor,
  fireEvent,
} from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as chromeHelpers from '../../helpers/chrome';
import Popup, { colors } from '../popup';

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

    const { queryAllByLabelText } = utils;

    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(colors[0]);

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const colorButtons = queryAllByLabelText('save color');
    const whiteList = queryAllByLabelText('whitelist toggle');
    const customForm = queryAllByLabelText('custom form');

    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(whiteList.length).toEqual(1);
    expect(customForm.length).toEqual(0);
  });

  it('should show custom input when no active color found', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { getByLabelText, queryAllByLabelText, container } = utils;

    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue('');

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const customColor = getByLabelText('custom color');
    const customForm = queryAllByLabelText('custom form');

    expect(customColor).toHaveClass('colorLinks--button active');
    await waitFor(() => expect(customForm.length).toEqual(1), { container });
  });

  it('should show a custom input when the custom color button is clicked', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { queryAllByLabelText, queryByLabelText } = utils;
    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(colors[0]);

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const colorButtons = queryAllByLabelText('save color');
    const customColorButton = queryByLabelText('custom color');
    const customForm = queryAllByLabelText('custom form');

    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(customForm.length).toEqual(0);

    fireEvent.click(customColorButton);

    waitFor(() => expect(customForm.length).toEqual(1));
  });

  it('should save a color when a color button is clicked', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { queryAllByLabelText } = utils;
    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(colors[0]);

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());

    const colorButtons = queryAllByLabelText('save color');
    const customForm = queryAllByLabelText('custom form');

    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(customForm.length).toEqual(0);

    fireEvent.click(colorButtons[1]);

    expect(colorButtons[0]).toHaveClass('colorLinks--button');
    expect(colorButtons[1]).toHaveClass('colorLinks--button active');
  });
});
