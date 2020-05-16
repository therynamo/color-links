import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CustomInput from '../customInput';

describe('customInput', () => {
  it('should update the current color with a custom one', () => {
    // Learn more about onSubmit testing here: https://kula.blog/posts/test_on_submit_in_react_testing_library/
    const saveSpy = jest.fn();
    const { getByLabelText } = render(<CustomInput color="#ffffff" saveHandler={saveSpy} />);

    const input = getByLabelText('custom input') as HTMLInputElement;
    const form = getByLabelText('custom form');

    fireEvent.change(input, {
      target: { value: '#f06d06' },
    });
    expect(input.value).toEqual('#f06d06');

    fireEvent.submit(form);
    expect(saveSpy).toHaveBeenCalledWith('#f06d06');
  });
});
