import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { InputProps } from './index';
import { Input } from './index';

const INPUT_NAME = 'test-input';
const INPUT_LABEL = 'test-label';
const INPUT_ERROR = 'test-error';
const TEST_VALUE = 'test-value';

const renderInput = (props?: Omit<InputProps, 'name'>) =>
  render(<Input name={INPUT_NAME} {...props} />);

describe('Input component', () => {
  it('Correctly renders in the DOM', () => {
    renderInput({ label: INPUT_LABEL });
    expect(screen.getByRole('textbox')).toBeDefined();
    expect(screen.getByText(INPUT_LABEL)).toBeDefined();
  });

  it('Correctly changes value with onChange prop', async () => {
    const handleChange = jest.fn();
    renderInput({ onChange: handleChange });
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, TEST_VALUE);
    expect(handleChange).toHaveBeenCalledTimes(TEST_VALUE.length);
    expect(inputElement).toHaveValue(TEST_VALUE);
  });

  it('Correctly shows error', () => {
    const { container } = renderInput({ isValid: false, error: INPUT_ERROR });
    expect(container.firstChild).toHaveClass('input_invalid');
    expect(screen.getByText(INPUT_ERROR)).toBeDefined();
  });

  it('Could be read-only', () => {
    const { container } = renderInput({ readOnly: true });
    expect(container.firstChild).toHaveClass('input_type_read-only');
    expect(screen.getByRole('textbox')).toHaveAttribute('readonly');
  });

  it('Could be disabled', () => {
    renderInput({ disabled: true });
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
