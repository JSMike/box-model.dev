import { execFileSync, spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

type ComponentSummary = {
  tagName: string;
  attributes: Array<{ name: string }>;
};

type ManifestInspection = {
  components: ComponentSummary[];
};

type ComponentInspection = {
  component: {
    tagName: string;
    importPath: string;
    slots: Array<{ name: string }>;
  };
};

describe('box-model-web agent skill', () => {
  const webRoot = path.resolve(
    path.dirname(fileURLToPath(import.meta.url)),
    '..'
  );
  const manifestPath = path.join(webRoot, 'src/custom-elements.json');
  const skillRoot = path.join(webRoot, 'skills/box-model-web');
  const scriptPath = path.join(skillRoot, 'scripts/inspect-cem.mjs');

  const runJson = (tagName?: string) => {
    const args = [scriptPath, '--manifest', manifestPath];
    if (tagName) {
      args.push(tagName);
    }
    args.push('--json');
    return JSON.parse(
      execFileSync(process.execPath, args, { encoding: 'utf8' })
    );
  };

  it('queries the generated manifest without external dependencies', () => {
    const all = runJson() as ManifestInspection;
    const alert = runJson('alert-box') as ComponentInspection;

    expect(all.components).toHaveLength(34);
    expect(all.components.map(({ tagName }) => tagName)).toContain(
      'terminal-line-box'
    );
    expect(alert.component).toMatchObject({
      tagName: 'alert-box',
      importPath: '@box-model/web/alert',
    });
    expect(alert.component.slots.map(({ name }) => name)).toContain(
      'close-control'
    );
  });

  it('fails clearly when a tag is not declared by the manifest', () => {
    const result = spawnSync(
      process.execPath,
      [scriptPath, '--manifest', manifestPath, 'not-a-box'],
      { encoding: 'utf8' }
    );

    expect(result.status).toBe(1);
    expect(result.stderr).toContain('Unknown custom element "not-a-box"');
    expect(result.stderr).toContain('alert-box');
  });

  it('provides a composition example for every published custom element', () => {
    const { components } = runJson() as ManifestInspection;
    const examples = readFileSync(
      path.join(skillRoot, 'references/components.md'),
      'utf8'
    );

    for (const { tagName } of components) {
      expect(examples).toContain(`## ${tagName}`);
      expect(examples).toContain(`<${tagName}`);
    }
  });

  it('uses only manifest-declared custom-element attributes in examples', () => {
    const { components } = runJson() as ManifestInspection;
    const examples = readFileSync(
      path.join(skillRoot, 'references/components.md'),
      'utf8'
    );
    const attributesByTag = new Map(
      components.map(({ tagName, attributes }) => [
        tagName,
        new Set(attributes.map(({ name }) => name)),
      ])
    );
    const globalAttributes = new Set([
      'class',
      'dir',
      'hidden',
      'id',
      'lang',
      'role',
      'slot',
      'style',
      'tabindex',
      'title',
    ]);
    const container = document.createElement('div');

    for (const match of examples.matchAll(/```html\n([\s\S]*?)```/g)) {
      container.innerHTML = match[1];

      for (const element of container.querySelectorAll('*')) {
        const declaredAttributes = attributesByTag.get(element.localName);
        if (!declaredAttributes) {
          continue;
        }

        for (const attribute of element.attributes) {
          const isGlobal =
            globalAttributes.has(attribute.name) ||
            attribute.name.startsWith('aria-') ||
            attribute.name.startsWith('data-');
          expect(
            isGlobal || declaredAttributes.has(attribute.name),
            `${element.localName}[${attribute.name}] is not declared in custom-elements.json`
          ).toBe(true);
        }
      }
    }
  });

  it('documents the compiled and mixin forms of the public style helpers', () => {
    const styles = readFileSync(
      path.join(skillRoot, 'references/styles.md'),
      'utf8'
    );

    expect(styles).toContain('.box-model-surface');
    expect(styles).toContain('@include surface.frame');
    expect(styles).toContain('.box-model-margin-container');
    expect(styles).toContain('@include theme.box-model-margin-container');
    expect(styles).toContain('@include typography.heading');
  });

  it('documents the opt-in framework JSX declaration entrypoints', () => {
    const skill = readFileSync(path.join(skillRoot, 'SKILL.md'), 'utf8');

    expect(skill).toContain('@box-model/web/react');
    expect(skill).toContain('@box-model/web/preact');
    expect(skill).toContain('@box-model/web/solid');
    expect(skill).toContain('compilerOptions.types');
  });
});
