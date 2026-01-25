import React, { useEffect, useRef, useState } from 'react';
import './color-table.scss';

type ColorRow = {
  token: string;
  purpose: string;
};

export const rows = {
  surfaces: [
    { token: 'box-model-background-canvas', purpose: 'Page-level canvas background' },
    { token: 'box-model-background-surface', purpose: 'Default surface cards and panels' },
    { token: 'box-model-background-elevated', purpose: 'Raised layers such as popovers' },
    { token: 'box-model-background-sunken', purpose: 'Recessed containers and inputs' },
    { token: 'box-model-background-content', purpose: 'Content-heavy regions like tables' },
    { token: 'box-model-background-inverse', purpose: 'Inverse surfaces for contrast' },
    { token: 'box-model-background-scrim', purpose: 'Overlay tint for modals and drawers' },
  ],
  text: [
    { token: 'box-model-text-primary', purpose: 'Primary body text' },
    { token: 'box-model-text-secondary', purpose: 'Muted supporting text' },
    { token: 'box-model-text-tertiary', purpose: 'Subtle helper text' },
    { token: 'box-model-text-inverse', purpose: 'Text on inverse surfaces' },
    { token: 'box-model-text-accent', purpose: 'Accent/emphasis text' },
    { token: 'box-model-text-success', purpose: 'Success state text' },
    { token: 'box-model-text-warning', purpose: 'Warning state text' },
    { token: 'box-model-text-danger', purpose: 'Error/danger text' },
  ],
  borders: [
    { token: 'box-model-border-subtle', purpose: 'Low-emphasis dividers' },
    { token: 'box-model-border-default', purpose: 'Standard component strokes' },
    { token: 'box-model-border-strong', purpose: 'High-contrast dividers' },
    { token: 'box-model-border-focus', purpose: 'Focus rings' },
    { token: 'box-model-border-inverse', purpose: 'Strokes on inverse surfaces' },
  ],
  brand: [
    { token: 'box-model-brand-primary-emphasis', purpose: 'Primary brand fill' },
    { token: 'box-model-brand-primary-strong', purpose: 'Stronger primary accent' },
    { token: 'box-model-brand-primary-intense', purpose: 'Highest-contrast primary accent' },
    { token: 'box-model-brand-primary-inverse', purpose: 'Primary on inverse surfaces' },
    { token: 'box-model-brand-primary-subtle', purpose: 'Light primary wash' },
    { token: 'box-model-brand-accent-emphasis', purpose: 'Secondary brand fill' },
    { token: 'box-model-brand-accent-strong', purpose: 'Stronger secondary accent' },
    { token: 'box-model-brand-accent-intense', purpose: 'Highest-contrast secondary accent' },
    { token: 'box-model-brand-accent-inverse', purpose: 'Secondary on inverse surfaces' },
    { token: 'box-model-brand-accent-subtle', purpose: 'Light secondary wash' },
  ],
  interactive: [
    { token: 'box-model-primary-rest', purpose: 'Primary action default' },
    { token: 'box-model-primary-hover', purpose: 'Primary hover state' },
    { token: 'box-model-primary-active', purpose: 'Primary active/pressed' },
    { token: 'box-model-primary-text', purpose: 'Text on primary actions' },
    { token: 'box-model-primary-focus-ring', purpose: 'Primary focus outline' },
    { token: 'box-model-primary-focus-shadow', purpose: 'Primary focus shadow' },
    { token: 'box-model-secondary-rest', purpose: 'Secondary action default' },
    { token: 'box-model-secondary-hover', purpose: 'Secondary hover state' },
    { token: 'box-model-secondary-active', purpose: 'Secondary active/pressed' },
    { token: 'box-model-secondary-text', purpose: 'Text on secondary actions' },
    { token: 'box-model-tertiary-rest', purpose: 'Tertiary action default' },
    { token: 'box-model-tertiary-hover', purpose: 'Tertiary hover state' },
    { token: 'box-model-tertiary-active', purpose: 'Tertiary active/pressed' },
    { token: 'box-model-tertiary-text', purpose: 'Text on tertiary actions' },
  ],
} as const;

const formatColor = (value: string) => {
  if (!value) return '—';
  const isRgb = value.startsWith('rgb');
  if (!isRgb) return value;
  const parts = value.replace(/rgba?\(|\)/g, '').split(',').map((v) => v.trim());
  const [r, g, b, a] = parts;
  if (a && a !== '1') {
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  }
  const toHex = (component: string) => {
    const int = Math.max(0, Math.min(255, parseInt(component, 10)));
    return int.toString(16).padStart(2, '0');
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

const Swatch: React.FC<{ token: string; mode: 'light' | 'dark' }> = ({ token, mode }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    if (!ref.current) return;
    const computed = getComputedStyle(ref.current).getPropertyValue('background-color').trim();
    setValue(formatColor(computed));
  }, []);

  const cssVar = `var(--${token}${mode === 'light' ? '-light' : '-dark'}, var(--${token}))`;

  return (
    <span className="color-value">
      <span className={`color-chip color-chip--${mode}`} style={{ ['--swatch' as string]: cssVar }} ref={ref} />
      <span className="color-value__text">{value || '—'}</span>
    </span>
  );
};

export const ColorTable: React.FC<{ rows: readonly ColorRow[] }> = ({ rows }) => (
  <table className="color-table">
    <thead>
      <tr>
        <th>Token</th>
        <th>Purpose</th>
        <th>Light</th>
        <th>Dark</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row) => (
        <tr key={row.token}>
          <td>
            <code>{row.token}</code>
          </td>
          <td>{row.purpose}</td>
          <td className="color-column color-column--light">
            <Swatch token={row.token} mode="light" />
          </td>
          <td className="color-column color-column--dark">
            <Swatch token={row.token} mode="dark" />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export const surfaces = rows.surfaces;
export const text = rows.text;
export const borders = rows.borders;
export const brand = rows.brand;
export const interactive = rows.interactive;
