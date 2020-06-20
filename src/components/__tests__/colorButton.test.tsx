import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import ColorButton from '../colorButton';

describe('ColorButton', () => {
  it('should run callback when clicked', () => {
    const mockFn = jest.fn();
    render(<ColorButton color="#37d67a" clickHandler={mockFn} />);
    const button = screen.getByTestId('color button');

    fireEvent.click(button);

    expect(mockFn).toBeCalled();
  });

  it('should have active className active is true', () => {
    const mockFn = jest.fn();
    render(<ColorButton active color="#37d67a" clickHandler={mockFn} />);
    const button = screen.getByTestId('color button');

    expect(button.classList.contains('active')).toBe(true);
  });
});
