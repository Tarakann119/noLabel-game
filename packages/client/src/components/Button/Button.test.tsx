import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import '@testing-library/jest-dom';

import { TButtonProps } from './Button.typings';
import { Button } from './index';

const BUTTON_TEXT = 'Button text';

const renderButton = (props?: TButtonProps) => render(<Button {...props}>{BUTTON_TEXT}</Button>);

describe('Button component', () => {
  it('Correctly renders in the DOM', () => {
    renderButton();
    expect(screen.getByRole('button')).toBeDefined();
    expect(screen.getByText(BUTTON_TEXT)).toBeDefined();
  });

  it('Correctly uses view prop', () => {
    renderButton({ view: 'secondary' });
    expect(screen.getByText(BUTTON_TEXT)).toHaveClass('button_secondary');
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
