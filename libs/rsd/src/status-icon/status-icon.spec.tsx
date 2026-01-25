import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusIcon } from './status-icon';

describe('StatusIcon', () => {
  it('renders info variant by default', () => {
    render(<StatusIcon />);
    expect(screen.getByText('i')).toBeTruthy();
  });

  it('renders success variant', () => {
    render(<StatusIcon variant="success" />);
    expect(screen.getByText('✓')).toBeTruthy();
  });

  it('renders warning variant', () => {
    render(<StatusIcon variant="warning" />);
    expect(screen.getByText('!')).toBeTruthy();
  });

  it('renders danger variant', () => {
    render(<StatusIcon variant="danger" />);
    expect(screen.getByText('✕')).toBeTruthy();
  });

  it('renders custom content', () => {
    render(<StatusIcon variant="custom">★</StatusIcon>);
    expect(screen.getByText('★')).toBeTruthy();
  });

  it('renders with aria-label when provided', () => {
    render(<StatusIcon variant="success" label="Success status" />);
    expect(screen.getByRole('img', { name: 'Success status' })).toBeTruthy();
  });
});
