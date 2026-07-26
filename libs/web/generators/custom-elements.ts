import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import Ajv from 'ajv';
import {
  collectComponentMetadata,
  lintAngularCheckType,
  type ComponentMeta,
  type ComponentMetadataResult,
  type ComponentTypeInfo,
} from './component-metadata.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_FILE = path.resolve(__dirname, '../src/custom-elements.json');
const require = createRequire(import.meta.url);
const SCHEMA_PATH = require.resolve('custom-elements-manifest/schema.json');

type CemType = {
  text: string;
  references?: Array<{
    name: string;
    module?: string;
    package?: string;
    start?: number;
    end?: number;
  }>;
};

type CemPackage = {
  schemaVersion: string;
  modules: CemModule[];
};

type CemModule = {
  kind: 'javascript-module';
  path: string;
  declarations?: CemCustomElement[];
  exports?: Array<
    | {
        kind: 'js';
        name: string;
        declaration: { name: string; module: string };
      }
    | {
        kind: 'custom-element-definition';
        name: string;
        declaration: { name: string; module: string };
      }
  >;
};

type CemCustomElement = {
  kind: 'class';
  name: string;
  summary?: string;
  description?: string;
  deprecated?: boolean | string;
  customElement: true;
  tagName: string;
  superclass?: { name: string; package: string };
  members?: Array<{
    kind: 'field';
    name: string;
    type?: CemType;
    default?: string;
    description?: string;
    deprecated?: boolean | string;
    attribute?: string;
    reflects?: boolean;
    readonly?: boolean;
    privacy?: 'public' | 'private' | 'protected';
  }>;
  attributes?: Array<{
    name: string;
    fieldName?: string;
    type?: CemType;
    default?: string;
    description?: string;
    deprecated?: boolean | string;
  }>;
  events?: Array<{
    name: string;
    type: CemType;
    description?: string;
    deprecated?: boolean | string;
  }>;
  slots?: Array<{ name: string; description?: string }>;
  cssParts?: Array<{ name: string; description?: string }>;
  cssProperties?: Array<{
    name: string;
    description?: string;
    default?: string;
  }>;
};

export type EmitCustomElementsOptions = {
  /** Fail the process when collector warnings or envelope issues are present. */
  strict?: boolean;
};

export async function emitCustomElementsManifest(
  metadata?: ComponentMetadataResult,
  options?: EmitCustomElementsOptions
): Promise<void> {
  const result = metadata ?? (await collectComponentMetadata());
  const strict = options?.strict ?? process.env.CEM_STRICT === '1';

  for (const warning of result.warnings) {
    console.warn(`[cem] ${warning}`);
  }

  const { issues: envelopeIssues, missingTypeCount } = runEnvelopeLint(
    result.components
  );
  for (const issue of envelopeIssues) {
    console.warn(`[cem:envelope] ${issue}`);
  }
  if (missingTypeCount > 0) {
    console.warn(
      `[cem:envelope] ${missingTypeCount} field(s)/event(s) missing type text`
    );
  }

  if (
    strict &&
    (result.warnings.length > 0 ||
      envelopeIssues.length > 0 ||
      missingTypeCount > 0)
  ) {
    throw new Error(
      `CEM strict mode failed: ${result.warnings.length} warning(s), ${envelopeIssues.length} envelope issue(s), ${missingTypeCount} missing type(s)`
    );
  }

  const manifest = buildManifest(result.components);
  await validateManifest(manifest);

  await fs.writeFile(
    OUTPUT_FILE,
    `${JSON.stringify(manifest, null, 2)}\n`,
    'utf-8'
  );
  console.log(
    `Generated custom elements manifest for ${result.components.length} components.`
  );
}

export function runEnvelopeLint(components: ComponentMeta[]): {
  issues: string[];
  missingTypeCount: number;
} {
  const issues: string[] = [];
  let missingTypeCount = 0;

  for (const component of components) {
    for (const property of component.properties) {
      const typeIssues = lintAngularCheckType(property.type);
      for (const issue of typeIssues) {
        if (issue === 'missing type text') {
          missingTypeCount += 1;
          issues.push(
            `${component.tagName}.${property.propertyName}: ${issue}`
          );
          continue;
        }
        issues.push(`${component.tagName}.${property.propertyName}: ${issue}`);
      }
    }
    for (const event of component.events) {
      const typeIssues = lintAngularCheckType(event.type);
      for (const issue of typeIssues) {
        if (issue === 'missing type text') {
          missingTypeCount += 1;
          issues.push(`${component.tagName} event ${event.name}: ${issue}`);
          continue;
        }
        issues.push(`${component.tagName} event ${event.name}: ${issue}`);
      }
    }
  }

  return { issues, missingTypeCount };
}

export function buildManifest(components: ComponentMeta[]): CemPackage {
  const byModule = new Map<string, ComponentMeta[]>();
  for (const component of components) {
    const list = byModule.get(component.modulePath) ?? [];
    list.push(component);
    byModule.set(component.modulePath, list);
  }

  const modules: CemModule[] = [];

  for (const [modulePath, moduleComponents] of Array.from(
    byModule.entries()
  ).sort(([a], [b]) => a.localeCompare(b))) {
    const declarations: CemCustomElement[] = [];
    const exports: NonNullable<CemModule['exports']> = [];

    for (const component of moduleComponents) {
      declarations.push(toDeclaration(component));
      exports.push({
        kind: 'js',
        name: component.className,
        declaration: { name: component.className, module: modulePath },
      });
      exports.push({
        kind: 'custom-element-definition',
        name: component.tagName,
        declaration: { name: component.className, module: modulePath },
      });
    }

    modules.push({
      kind: 'javascript-module',
      path: modulePath,
      declarations,
      exports,
    });
  }

  return {
    schemaVersion: '2.1.0',
    modules,
  };
}

function toCemType(type: ComponentTypeInfo | undefined): CemType | undefined {
  if (!type?.text) return undefined;
  return {
    text: type.text,
    references: type.references?.map((ref) => ({
      name: ref.name,
      module: ref.module,
      package: ref.package,
      start: ref.start,
      end: ref.end,
    })),
  };
}

export function toDeclaration(component: ComponentMeta): CemCustomElement {
  const members = component.properties.map((property) => ({
    kind: 'field' as const,
    name: property.propertyName,
    type: toCemType(property.type),
    default: property.default,
    description: property.description,
    deprecated: property.deprecated,
    attribute: property.attributeName,
    reflects: property.reflects || undefined,
    readonly: property.readonly || undefined,
    privacy: property.privacy,
  }));

  const attributes = component.properties
    .filter(
      (property): property is typeof property & { attributeName: string } =>
        property.attributeName !== undefined
    )
    .map((property) => ({
      name: property.attributeName,
      fieldName: property.propertyName,
      type: toCemType(property.type),
      default: property.default,
      description: property.description,
      deprecated: property.deprecated,
    }));

  const declaration: CemCustomElement = {
    kind: 'class',
    name: component.className,
    summary: component.summary,
    description: component.description,
    deprecated: component.deprecated,
    customElement: true,
    tagName: component.tagName,
    superclass: { name: 'LitElement', package: 'lit' },
  };

  if (members.length) declaration.members = members;
  if (attributes.length) declaration.attributes = attributes;
  if (component.events.length) {
    declaration.events = component.events.map((event) => ({
      name: event.name,
      type: toCemType(event.type) ?? {
        text: 'Event',
        references: [{ name: 'Event', package: 'global:', start: 0, end: 5 }],
      },
      description: event.description,
      deprecated: event.deprecated,
    }));
  }
  if (component.slots.length) {
    declaration.slots = component.slots.map((slot) => ({
      name: slot.name,
      description: slot.description,
    }));
  }
  if (component.cssParts.length) {
    declaration.cssParts = component.cssParts.map((part) => ({
      name: part.name,
      description: part.description,
    }));
  }
  if (component.cssProperties.length) {
    declaration.cssProperties = component.cssProperties.map((prop) => ({
      name: prop.name,
      description: prop.description,
      default: prop.default,
    }));
  }

  return declaration;
}

async function validateManifest(manifest: CemPackage) {
  const schema = JSON.parse(await fs.readFile(SCHEMA_PATH, 'utf-8'));
  const ajv = new Ajv({ allErrors: true, strict: false });
  const validate = ajv.compile(schema);
  const valid = validate(manifest);
  if (!valid) {
    const details = (validate.errors ?? [])
      .map((error) => `${error.instancePath || '/'} ${error.message}`)
      .join('\n');
    throw new Error(
      `Custom elements manifest failed schema validation:\n${details}`
    );
  }
}
