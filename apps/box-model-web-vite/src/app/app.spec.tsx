import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from './app';

describe('App', () => {
  it('renders the home page with the public surface treatment', async () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', {
      level: 1,
      name: 'Box Model UI',
    });

    expect(heading).toBeInTheDocument();
    expect(heading.closest('.box-model-surface')).toHaveClass(
      'box-model-surface--prominent'
    );
    expect(screen.getByRole('banner')).toHaveClass(
      'box-model-surface',
      'box-model-surface--subtle'
    );
    expect(
      screen.getByRole('navigation', { name: 'Primary navigation' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: 'Skip to main content' })
    ).toHaveAttribute('href', '#main-content');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main-content');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(
      screen.getByRole('region', { name: "What's in the box?" })
    ).toBeVisible();
    expect(
      screen.getByRole('region', { name: 'Ready to think inside the box?' })
    ).toHaveClass('box-model-surface--prominent');
    expect(
      screen.getByText('Slots keep composition inside the box.')
    ).toBeVisible();
    expect(screen.getByText(/npm install @box-model\/web/)).toBeVisible();
    expect(screen.getByLabelText('Alert component markup')).toHaveTextContent(
      '<alert-box variant="success">'
    );
    expect(
      screen.getByRole('img', {
        name: 'Page layout with header, navigation, content, and footer regions',
      })
    ).toBeVisible();
    expect(document.querySelector('columns-box')).toHaveAttribute(
      'min-width',
      '5rem'
    );
    expect(
      screen.getByRole('list', { name: 'Semantic color tokens' })
    ).toBeVisible();
    expect(
      screen.getByText('--box-model-brand-primary-emphasis')
    ).toBeVisible();
  });
});
