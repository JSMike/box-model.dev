import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Stat } from './stat';

describe('Stat', () => {
  it('renders value', () => {
    render(<Stat value="42" />);
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders with title', () => {
    render(<Stat value="42" title="Components" />);
    expect(screen.getByText('Components')).toBeTruthy();
    expect(screen.getByText('42')).toBeTruthy();
  });

  it('renders with delta', () => {
    render(<Stat value="42" delta="+5" />);
    expect(screen.getByText('+5')).toBeTruthy();
  });

  it('renders trend indicator when enabled', () => {
    render(<Stat value="42" delta="+5" trend="up" showTrendIndicator />);
    expect(screen.getByText('↑')).toBeTruthy();
  });

  it('renders different trend icons', () => {
    const { rerender } = render(<Stat value="42" delta="+5" trend="up" showTrendIndicator />);
    expect(screen.getByText('↑')).toBeTruthy();

    rerender(<Stat value="42" delta="-3" trend="down" showTrendIndicator />);
    expect(screen.getByText('↓')).toBeTruthy();

    rerender(<Stat value="42" delta="0" trend="neutral" showTrendIndicator />);
    expect(screen.getByText('⇌')).toBeTruthy();
  });
});
