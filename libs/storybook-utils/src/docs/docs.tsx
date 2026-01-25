import React from 'react';
import type { Meta as WebMeta } from '@storybook/web-components';
import type { Meta as ReactMeta } from '@storybook/react';
import './docs.scss';

type Scalar = string | number | boolean;

type AttributeDoc = {
  type?: string;
  description?: string;
  defaultValue?: Scalar;
  options?: ReadonlyArray<Scalar>;
  [key: string]: unknown;
};

type EventDoc = {
  description?: string;
  detail?: string;
  [key: string]: unknown;
};

type MethodDoc = {
  description?: string;
  signature?: string;
  returns?: string;
  [key: string]: unknown;
};

type MemberPropertyDoc = {
  description?: string;
  type?: string;
  [key: string]: unknown;
};

type SlotDoc = {
  description?: string;
  [key: string]: unknown;
};

type CssPropertyDoc = {
  description?: string;
  defaultValue?: string;
  [key: string]: unknown;
};

type CssPartDoc = {
  description?: string;
  [key: string]: unknown;
};

type DependencyDoc = {
  description?: string;
  included?: boolean;
  [key: string]: unknown;
};

type ApiDoc = {
  selector?: string;
  className?: string;
  attributes?: Record<string, AttributeDoc>;
  events?: Record<string, EventDoc>;
  methods?: Record<string, MethodDoc>;
  memberProperties?: Record<string, MemberPropertyDoc>;
  slots?: Record<string, SlotDoc>;
  cssProperties?: Record<string, CssPropertyDoc>;
  cssParts?: Record<string, CssPartDoc>;
  dependencies?: Record<string, DependencyDoc>;
};

type DocsExtension = {
  docs?: ApiDoc | ApiDoc[];
  attributes?: Record<string, AttributeDoc>;
  events?: Record<string, EventDoc>;
  methods?: Record<string, MethodDoc>;
  memberProperties?: Record<string, MemberPropertyDoc>;
  slots?: Record<string, SlotDoc>;
  cssProperties?: Record<string, CssPropertyDoc>;
  cssParts?: Record<string, CssPartDoc>;
  dependencies?: Record<string, DependencyDoc>;
};

export type Docs<TMeta = WebMeta | ReactMeta> = TMeta & DocsExtension;

type DocsProps = {
  of: { default?: Docs };
};

type TableRow = React.ReactNode[];
type Section = {
  title: string;
  headers: string[];
  rows: TableRow[];
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'section';

const formatValue = (value?: unknown) => {
  if (value === undefined || value === null || value === '') {
    return '—';
  }

  if (typeof value === 'boolean') {
    return value ? 'true' : 'false';
  }

  return String(value);
};

const formatOptions = (options?: ReadonlyArray<Scalar>) => {
  if (!options || options.length === 0) {
    return '—';
  }

  return (
    <span className="component-docs__options">
      {options.map((option, index) => (
        <React.Fragment key={`${option}-${index}`}>
          {index > 0 && ', '}
          <code>{String(option)}</code>
        </React.Fragment>
      ))}
    </span>
  );
};

const hasEntries = <T,>(record?: Record<string, T>): record is Record<string, T> =>
  !!record && Object.keys(record).length > 0;

const SectionTable: React.FC<{
  title: string;
  id?: string;
  headers: string[];
  rows: TableRow[];
}> = ({ title, id, headers, rows }) => {
  if (!rows.length) {
    return null;
  }

  return (
    <section className="component-docs__section">
      <h3 className="component-docs__title" id={id}>
        {title}
      </h3>
      <div className="component-docs__table">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th scope="col" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((cells, rowIndex) => (
              <tr key={`${title}-${rowIndex}`}>
                {cells.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <th scope="row" key={`${title}-${rowIndex}-${cellIndex}`}>
                      {cell}
                    </th>
                  ) : (
                    <td key={`${title}-${rowIndex}-${cellIndex}`}>{cell}</td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const getApiEntries = (docs?: Docs): ApiDoc[] | undefined => {
  if (!docs) return undefined;
  if (docs.docs) {
    return Array.isArray(docs.docs) ? docs.docs : [docs.docs];
  }

  // Legacy fallback to top-level fields
  const legacy: ApiDoc = {
    selector: (docs as Record<string, unknown>).component as string | undefined,
    className: undefined,
    attributes: docs.attributes,
    events: docs.events,
    methods: docs.methods,
    memberProperties: docs.memberProperties,
    slots: docs.slots,
    cssProperties: docs.cssProperties,
    cssParts: docs.cssParts,
    dependencies: docs.dependencies,
  };

  const hasLegacy =
    hasEntries(legacy.attributes) ||
    hasEntries(legacy.events) ||
    hasEntries(legacy.methods) ||
    hasEntries(legacy.memberProperties) ||
    hasEntries(legacy.slots) ||
    hasEntries(legacy.cssProperties) ||
    hasEntries(legacy.cssParts) ||
    hasEntries(legacy.dependencies);

  return hasLegacy ? [legacy] : undefined;
};

const buildSections = (api: ApiDoc): Section[] => {
  const attributes = api.attributes;

  const attributeRows: TableRow[] = hasEntries(attributes)
    ? Object.entries(attributes).map(([name, attribute]) => [
        <code key={name}>{name}</code>,
        attribute?.type ?? '—',
        attribute?.description ?? '—',
        formatValue(attribute?.defaultValue),
        formatOptions(attribute?.options),
      ])
    : [];

  const eventRows: TableRow[] = hasEntries(api.events)
    ? Object.entries(api.events).map(([name, event]) => [
        <code key={name}>{name}</code>,
        event?.detail ?? '—',
        event?.description ?? '—',
      ])
    : [];

  const methodRows: TableRow[] = hasEntries(api.methods)
    ? Object.entries(api.methods).map(([name, method]) => [
        <code key={name}>{name}</code>,
        method?.signature ?? '—',
        method?.returns ?? '—',
        method?.description ?? '—',
      ])
    : [];

  const memberPropertyRows: TableRow[] = hasEntries(api.memberProperties)
    ? Object.entries(api.memberProperties).map(([name, property]) => [
        <code key={name}>{name}</code>,
        property?.type ?? '—',
        property?.description ?? '—',
      ])
    : [];

  const slotRows: TableRow[] = hasEntries(api.slots)
    ? Object.entries(api.slots).map(([name, slot]) => [
        <code key={name}>{name || 'default'}</code>,
        slot?.description ?? '—',
      ])
    : [];

  const cssPropertyRows: TableRow[] = hasEntries(api.cssProperties)
    ? Object.entries(api.cssProperties).map(([name, property]) => [
        <code key={name}>{name}</code>,
        formatValue(property?.defaultValue),
        property?.description ?? '—',
      ])
    : [];

  const cssPartRows: TableRow[] = hasEntries(api.cssParts)
    ? Object.entries(api.cssParts).map(([name, part]) => [
        <code key={name}>{name}</code>,
        part?.description ?? '—',
      ])
    : [];

  const dependencyRows: TableRow[] = hasEntries(api.dependencies)
    ? Object.entries(api.dependencies).map(([name, dependency]) => [
        <code key={name}>{name}</code>,
        dependency?.included === undefined ? '—' : dependency.included ? 'Yes' : 'No',
        dependency?.description ?? '—',
      ])
    : [];

  return [
    {
      title: 'Attributes',
      headers: ['Attribute', 'Type', 'Description', 'Default', 'Options'],
      rows: attributeRows,
    },
    {
      title: 'Events',
      headers: ['Event', 'Detail', 'Description'],
      rows: eventRows,
    },
    {
      title: 'Methods',
      headers: ['Method', 'Signature', 'Returns', 'Description'],
      rows: methodRows,
    },
    {
      title: 'Member Properties',
      headers: ['Property', 'Type', 'Description'],
      rows: memberPropertyRows,
    },
    {
      title: 'Slots',
      headers: ['Slot', 'Description'],
      rows: slotRows,
    },
    {
      title: 'CSS Custom Properties',
      headers: ['Custom Property', 'Default', 'Description'],
      rows: cssPropertyRows,
    },
    {
      title: 'CSS Parts',
      headers: ['Part', 'Description'],
      rows: cssPartRows,
    },
    {
      title: 'Dependencies',
      headers: ['Dependency', 'Included', 'Description'],
      rows: dependencyRows,
    },
  ];
};

const buildBaseId = (api: ApiDoc, index: number) =>
  slugify(api.className ?? api.selector ?? `component-${index}`);

export const DocsTOC: React.FC<DocsProps> = ({ of }) => {
  const apiEntries = getApiEntries(of.default);

  if (!apiEntries || apiEntries.length === 0) {
    return null;
  }

  return (
    <nav className="component-docs__toc" aria-label="API table of contents">
      <ul>
        {apiEntries.map((api, index) => {
          const baseId = buildBaseId(api, index);
          const headingId = `${baseId}-api`;
          const sections = buildSections(api).filter((section) => section.rows.length > 0);
          const label = api.selector
            ? `<${api.selector}>${api.className ? ` · ${api.className}` : ''}`
            : api.className ?? 'API';
          return (
            <li key={headingId}>
              <a href={`#${headingId}`}>{label}</a>
              {sections.length > 0 ? (
                <ul>
                  {sections.map((section) => {
                    const sectionId = `${baseId}-${slugify(section.title)}`;
                    return (
                      <li key={sectionId}>
                        <a href={`#${sectionId}`}>{section.title}</a>
                      </li>
                    );
                  })}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export const ComponentDocs: React.FC<DocsProps> = ({ of }) => {
  const apiEntries = getApiEntries(of.default);

  if (!apiEntries || apiEntries.length === 0) {
    return null;
  }

  return (
    <div className="component-docs">
      {apiEntries.map((api, index) => (
        <ApiSection key={`${api.selector ?? index}-${api.className ?? 'api'}`} api={api} index={index} />
      ))}
    </div>
  );
};

const ApiSection: React.FC<{ api: ApiDoc; index: number }> = ({ api, index }) => {
  const selectorLabel = api.selector ? `<${api.selector}>` : undefined;
  const baseId = buildBaseId(api, index);
  const headingId = `${baseId}-api`;
  const sections = buildSections(api);

  const visibleSections = sections.filter((section) => section.rows.length > 0);

  if (visibleSections.length === 0) {
    return null;
  }

  return (
    <>
      {(selectorLabel || api.className) && (
        <h2 id={headingId} className="component-docs__api-heading">
          API:
          {api.className ? <code>{api.className}</code> : null}
          {selectorLabel ? <code>{selectorLabel}</code> : null}
        </h2>
      )}
      {visibleSections.map((section) => (
        <SectionTable
          key={section.title}
          id={`${baseId}-${slugify(section.title)}`}
          {...section}
        />
      ))}
    </>
  );
};
