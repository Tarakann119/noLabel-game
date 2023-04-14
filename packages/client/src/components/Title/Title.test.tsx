import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { Title } from './index';
import { TitleProps } from './Title.typings';

const TITLE_TEXT = 'TEST TITLE';
const renderTitle = (props: TitleProps) => render(<Title {...props}>{TITLE_TEXT}</Title>);

describe('Form component', () => {
  it('Correctly renders in the DOM', () => {
    renderTitle({ level: '1' });
    expect(screen.getByText(TITLE_TEXT)).toBeDefined();
  });

  it('Correctly added class', () => {
    renderTitle({ className: 'test-class', level: '1' });
    expect(screen.getByText(TITLE_TEXT)).toHaveClass('test-class');
  });
});
