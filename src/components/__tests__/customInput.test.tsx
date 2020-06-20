import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomInput from '../customInput';

describe('customInput', () => {
  it('should update the current color with a custom one', () => {
    // Learn more about onSubmit testing here: https://kula.blog/posts/test_on_submit_in_react_testing_library/
    const saveSpy = jest.fn();
    render(<CustomInput color="#ffffff" saveHandler={saveSpy} />);

    const input = screen.getByTestId('custom input') as HTMLInputElement;
    const form = screen.getByTestId('form');

    fireEvent.change(input, {
      target: { value: '#f06d06' },
    });
    expect(input.value).toEqual('#f06d06');

    fireEvent.submit(form);
    expect(saveSpy).toHaveBeenCalledWith('#f06d06');
  });

  it('should render an input', () => {
    const saveSpy = jest.fn();
    render(<CustomInput color="#ffffff" saveHandler={saveSpy} />);

    const input = screen.getByTestId('custom input');

    expect(input).toBeInTheDocument();
  });

  it('should render a button', () => {
    const saveSpy = jest.fn();
    render(<CustomInput color="#ffffff" saveHandler={saveSpy} />);

    const input = screen.getByTestId('save button');

    expect(input).toBeInTheDocument();
  });
});
