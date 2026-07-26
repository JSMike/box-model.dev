#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const skillDirectory = dirname(scriptDirectory);

function parseArguments(argv) {
  const options = {
    json: false,
    manifest: undefined,
    tag: undefined,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === '--json') {
      options.json = true;
      continue;
    }

    if (argument === '--manifest') {
      const manifest = argv[index + 1];
      if (!manifest) {
        throw new Error('--manifest requires a file path.');
      }
      options.manifest = manifest;
      index += 1;
      continue;
    }

    if (argument === '--help' || argument === '-h') {
      options.help = true;
      continue;
    }

    if (argument.startsWith('-')) {
      throw new Error(`Unknown option: ${argument}`);
    }

    if (options.tag) {
      throw new Error(`Unexpected argument: ${argument}`);
    }
    options.tag = argument;
  }

  return options;
}

function manifestCandidates(explicitPath) {
  return [
    explicitPath ? resolve(explicitPath) : undefined,
    resolve(skillDirectory, '../../custom-elements.json'),
    resolve(skillDirectory, '../../src/custom-elements.json'),
    resolve(process.cwd(), 'custom-elements.json'),
    resolve(process.cwd(), 'node_modules/@box-model/web/custom-elements.json'),
    resolve(process.cwd(), 'libs/web/src/custom-elements.json'),
  ].filter(Boolean);
}

function findManifest(explicitPath) {
  const candidates = manifestCandidates(explicitPath);
  const manifestPath = candidates.find((candidate) => existsSync(candidate));

  if (!manifestPath) {
    throw new Error(
      [
        'Unable to locate @box-model/web/custom-elements.json.',
        'Pass its location explicitly with --manifest <path>.',
        'Checked:',
        ...candidates.map((candidate) => `  - ${candidate}`),
      ].join('\n')
    );
  }

  return manifestPath;
}

function typeText(entry) {
  return entry?.type?.text ?? 'unknown';
}

function publicFields(declaration) {
  return (declaration.members ?? []).filter(
    (member) =>
      member.kind === 'field' &&
      member.static !== true &&
      member.privacy !== 'private' &&
      member.privacy !== 'protected'
  );
}

function normalizeDeclaration(module, declaration) {
  const modulePath = module.path ?? '';
  const importPath = modulePath
    ? `@box-model/web/${modulePath.replace(/\.js$/, '')}`
    : '@box-model/web';

  return {
    tagName: declaration.tagName,
    name: declaration.name,
    summary: declaration.summary ?? declaration.description ?? '',
    module: modulePath,
    importPath,
    attributes: (declaration.attributes ?? []).map((attribute) => ({
      name: attribute.name,
      fieldName: attribute.fieldName,
      type: typeText(attribute),
      default: attribute.default,
      description: attribute.description ?? '',
    })),
    properties: publicFields(declaration).map((property) => ({
      name: property.name,
      attribute: property.attribute,
      type: typeText(property),
      default: property.default,
      readonly: property.readonly === true,
      description: property.description ?? '',
    })),
    events: (declaration.events ?? []).map((event) => ({
      name: event.name,
      type: typeText(event),
      description: event.description ?? '',
    })),
    slots: (declaration.slots ?? []).map((slot) => ({
      name: slot.name ?? '',
      description: slot.description ?? '',
    })),
    cssProperties: (declaration.cssProperties ?? []).map((property) => ({
      name: property.name,
      default: property.default,
      description: property.description ?? '',
    })),
    cssParts: (declaration.cssParts ?? []).map((part) => ({
      name: part.name,
      description: part.description ?? '',
    })),
  };
}

function readComponents(manifestPath) {
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  const components = [];

  for (const module of manifest.modules ?? []) {
    for (const declaration of module.declarations ?? []) {
      if (declaration.customElement === true && declaration.tagName) {
        components.push(normalizeDeclaration(module, declaration));
      }
    }
  }

  return components.sort((left, right) =>
    left.tagName.localeCompare(right.tagName)
  );
}

function cell(value) {
  if (value === undefined || value === null || value === '') {
    return '—';
  }
  return String(value).replace(/\r?\n/g, ' ').replace(/\|/g, '\\|');
}

function table(headers, rows) {
  if (rows.length === 0) {
    return '_None._';
  }

  return [
    `| ${headers.join(' | ')} |`,
    `| ${headers.map(() => '---').join(' | ')} |`,
    ...rows.map((row) => `| ${row.map(cell).join(' | ')} |`),
  ].join('\n');
}

function renderComponent(component, manifestPath) {
  return [
    `# \`<${component.tagName}>\``,
    '',
    component.summary,
    '',
    `- Manifest: \`${manifestPath}\``,
    `- Module: \`${component.module}\``,
    `- Import: \`import '${component.importPath}';\``,
    '',
    '## Attributes',
    '',
    table(
      ['Name', 'Property', 'Type', 'Default', 'Description'],
      component.attributes.map((attribute) => [
        `\`${attribute.name}\``,
        attribute.fieldName ? `\`${attribute.fieldName}\`` : '',
        `\`${attribute.type}\``,
        attribute.default ? `\`${attribute.default}\`` : '',
        attribute.description,
      ])
    ),
    '',
    '## Public properties',
    '',
    table(
      ['Name', 'Attribute', 'Type', 'Default', 'Readonly', 'Description'],
      component.properties.map((property) => [
        `\`${property.name}\``,
        property.attribute ? `\`${property.attribute}\`` : '',
        `\`${property.type}\``,
        property.default ? `\`${property.default}\`` : '',
        property.readonly ? 'yes' : 'no',
        property.description,
      ])
    ),
    '',
    '## Events',
    '',
    table(
      ['Name', 'Type', 'Description'],
      component.events.map((event) => [
        `\`${event.name}\``,
        `\`${event.type}\``,
        event.description,
      ])
    ),
    '',
    '## Slots',
    '',
    table(
      ['Name', 'Description'],
      component.slots.map((slot) => [
        slot.name ? `\`${slot.name}\`` : 'default',
        slot.description,
      ])
    ),
    '',
    '## CSS custom properties',
    '',
    table(
      ['Name', 'Default', 'Description'],
      component.cssProperties.map((property) => [
        `\`${property.name}\``,
        property.default ? `\`${property.default}\`` : '',
        property.description,
      ])
    ),
    '',
    '## CSS parts',
    '',
    table(
      ['Name', 'Description'],
      component.cssParts.map((part) => [`\`${part.name}\``, part.description])
    ),
  ].join('\n');
}

function renderList(components, manifestPath) {
  return [
    `Manifest: \`${manifestPath}\``,
    '',
    ...components.map(
      (component) =>
        `- \`<${component.tagName}>\` — ${
          component.summary || component.importPath
        }`
    ),
  ].join('\n');
}

function help() {
  return `Inspect @box-model/web custom-element metadata.

Usage:
  node inspect-cem.mjs [--manifest <path>] [<tag-name>] [--json]

Examples:
  node inspect-cem.mjs
  node inspect-cem.mjs alert-box
  node inspect-cem.mjs dialog-box --json`;
}

export function run(argv = process.argv.slice(2)) {
  const options = parseArguments(argv);
  if (options.help) {
    return help();
  }

  const manifestPath = findManifest(options.manifest);
  const components = readComponents(manifestPath);

  if (!options.tag) {
    return options.json
      ? JSON.stringify({ manifestPath, components }, null, 2)
      : renderList(components, manifestPath);
  }

  const component = components.find(
    (candidate) => candidate.tagName === options.tag
  );
  if (!component) {
    throw new Error(
      `Unknown custom element "${options.tag}". Available tags:\n${components
        .map((candidate) => `  - ${candidate.tagName}`)
        .join('\n')}`
    );
  }

  return options.json
    ? JSON.stringify({ manifestPath, component }, null, 2)
    : renderComponent(component, manifestPath);
}

const isMain =
  process.argv[1] !== undefined &&
  resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
  try {
    process.stdout.write(`${run()}\n`);
  } catch (error) {
    process.stderr.write(
      `${error instanceof Error ? error.message : String(error)}\n`
    );
    process.exitCode = 1;
  }
}
