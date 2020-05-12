import React from 'react';
import { render, RenderResult, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import * as chromeHelpers from '../../helpers/chrome';
import Popup, { colors } from '../popup';

jest.mock('../../helpers/chrome.ts');
jest.mock('../../helpers/Whitelist.ts');

describe('Popup', () => {
  it('should retreieve an active color and not show custom input when found', async () => {
    let utils = {} as RenderResult;

    act(async () => {
      utils = render(<Popup />);
    });

    const { queryAllByLabelText } = utils;

    (chromeHelpers.getActiveColor as jest.Mock).mockResolvedValue(colors[0]);

    const colorButtons = queryAllByLabelText('save color');
    const whiteList = queryAllByLabelText('whitelist toggle');
    const customForm = queryAllByLabelText('custom form');

    await waitFor(() => expect(chromeHelpers.getActiveColor).toHaveBeenCalled());
    expect(colorButtons[0]).toHaveClass('colorLinks--button active');
    expect(whiteList.length).toEqual(1);
    expect(customForm.length).toEqual(0);
  });
});
