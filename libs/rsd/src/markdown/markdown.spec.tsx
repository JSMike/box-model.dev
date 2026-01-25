import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Markdown } from './markdown';

describe('Markdown', () => {
  it('renders children', () => {
    render(<Markdown>Hello, world!</Markdown>);
    expect(screen.getByText('Hello, world!')).toBeTruthy();
  });

  it('renders nested content', () => {
    render(
      <Markdown>
        <p>Paragraph one</p>
        <p>Paragraph two</p>
      </Markdown>
    );
    expect(screen.getByText('Paragraph one')).toBeTruthy();
    expect(screen.getByText('Paragraph two')).toBeTruthy();
  });
});
