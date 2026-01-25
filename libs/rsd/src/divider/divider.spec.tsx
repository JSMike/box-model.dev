import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Divider } from './divider';

describe('Divider', () => {
  it('renders horizontal by default', () => {
    render(<Divider />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeTruthy();
    expect(separator.getAttribute('aria-orientation')).toBe('horizontal');
  });

  it('renders vertical orientation', () => {
    render(<Divider orientation="vertical" />);
    const separator = screen.getByRole('separator');
    expect(separator).toBeTruthy();
    expect(separator.getAttribute('aria-orientation')).toBe('vertical');
  });
});
