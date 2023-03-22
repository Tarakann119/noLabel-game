import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Title } from './index';
import { TitleProps } from './Title.typings';

const TITLE_TEXT = 'TEST TITLE';
const renderTitle = (props: TitleProps) => render(<Title {...props} />);

describe('Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderTitle({ text: TITLE_TEXT });
    expect(screen.getByText(TITLE_TEXT)).toBeDefined();
  });

  it('Correctly added class', () => {
    renderTitle({ className: 'test-class', text: TITLE_TEXT });
    expect(screen.getByText(TITLE_TEXT)).toHaveClass('test-class');
  });
});
