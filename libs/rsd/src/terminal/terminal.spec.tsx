import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Terminal, TerminalLine } from './terminal';

describe('Terminal', () => {
  it('renders children', () => {
    render(
      <Terminal>
        <TerminalLine>npm install</TerminalLine>
      </Terminal>
    );
    expect(screen.getByText('npm install')).toBeTruthy();
  });
});

describe('TerminalLine', () => {
  it('renders with prompt variant by default', () => {
    render(<TerminalLine>command</TerminalLine>);
    expect(screen.getByText('command')).toBeTruthy();
    expect(screen.getByText('$')).toBeTruthy();
  });

  it('renders with success variant', () => {
    render(<TerminalLine variant="success">Done!</TerminalLine>);
    expect(screen.getByText('Done!')).toBeTruthy();
    expect(screen.getByText('✔')).toBeTruthy();
  });

  it('renders with info variant', () => {
    render(<TerminalLine variant="info">Information</TerminalLine>);
    expect(screen.getByText('Information')).toBeTruthy();
    expect(screen.getByText('i')).toBeTruthy();
  });

  it('renders cursor when enabled', () => {
    render(<TerminalLine cursor>typing</TerminalLine>);
    expect(screen.getByText('_')).toBeTruthy();
  });
});
