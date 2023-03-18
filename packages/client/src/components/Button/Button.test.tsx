import * as React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ButtonProps } from './index';
import { Button } from './index';

const BUTTON_TEXT = 'Button text';

const renderButton = (props?: Omit<ButtonProps, 'text'>) =>
  render(<Button text={BUTTON_TEXT} {...props} />);

describe('Button component', () => {
  it('Correctly renders in the DOM', () => {
    renderButton();
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText(BUTTON_TEXT)).toBeDefined();
  });

  it('Correctly uses view prop', () => {
    renderButton({ view: 'secondary' });
    expect(screen.getByText(BUTTON_TEXT)).toHaveClass('button_view_secondary');
  });

  it('Correctly uses onClick prop', async () => {
    const handleClick = jest.fn();
    renderButton({ onClick: handleClick });
    await userEvent.click(screen.getByText(BUTTON_TEXT));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('Could be disabled', () => {
    renderButton({ disabled: true });
    expect(screen.getByText(BUTTON_TEXT)).toBeDisabled();
  });
});
