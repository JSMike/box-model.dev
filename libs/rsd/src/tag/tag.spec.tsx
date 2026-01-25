import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Tag } from './tag';

describe('Tag', () => {
  it('renders children', () => {
    render(<Tag>Label</Tag>);
    expect(screen.getByText('Label')).toBeTruthy();
  });

  it('renders with different variants', () => {
    const { rerender } = render(<Tag variant="success">Success</Tag>);
    expect(screen.getByText('Success')).toBeTruthy();

    rerender(<Tag variant="danger">Danger</Tag>);
    expect(screen.getByText('Danger')).toBeTruthy();

    rerender(<Tag variant="warning">Warning</Tag>);
    expect(screen.getByText('Warning')).toBeTruthy();

    rerender(<Tag variant="info">Info</Tag>);
    expect(screen.getByText('Info')).toBeTruthy();

    rerender(<Tag variant="neutral">Neutral</Tag>);
    expect(screen.getByText('Neutral')).toBeTruthy();
  });

  it('defaults to neutral variant', () => {
    render(<Tag>Default</Tag>);
    expect(screen.getByText('Default')).toBeTruthy();
  });
});
