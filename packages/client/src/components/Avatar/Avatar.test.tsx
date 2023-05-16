import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';

import { AvatarProps } from './Avatar.typings';
import { Avatar } from './index';

const TEST_TEXT = 'test-text';

const renderAvatar = (props?: AvatarProps) => render(<Avatar {...props} />);

describe('Тестирование компонента Avatar', () => {
  it('Корректный рендер в DOM', () => {
    renderAvatar();
    expect(screen.getByRole('img')).toBeDefined();
  });

  it('Корректный ALT аттрибут', () => {
    renderAvatar({ alt: TEST_TEXT });
    expect(screen.getByRole('img')).toHaveAttribute('alt', TEST_TEXT);
  });

  it('Корректно добавляется классы', () => {
    renderAvatar({ className: TEST_TEXT });
    expect(screen.getByRole('img')).toHaveClass(TEST_TEXT);
  });
});
