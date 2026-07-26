import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

type FrameworkCase = {
  fileName: string;
  jsx: ts.JsxEmit;
  jsxImportSource?: string;
};

type ModuleResolutionCase = {
  module: ts.ModuleKind;
  moduleResolution: ts.ModuleResolutionKind;
  name: string;
};

const webRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..'
);
const fixtureRoot = path.join(
  webRoot,
  'generators/__fixtures__/framework-typings'
);

const frameworkCases: FrameworkCase[] = [
  {
    fileName: 'react.tsx',
    jsx: ts.JsxEmit.ReactJSX,
  },
  {
    fileName: 'preact.tsx',
    jsx: ts.JsxEmit.ReactJSX,
    jsxImportSource: 'preact',
  },
  {
    fileName: 'solid.tsx',
    jsx: ts.JsxEmit.Preserve,
    jsxImportSource: 'solid-js',
  },
];

const moduleResolutionCases: ModuleResolutionCase[] = [
  {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    name: 'Bundler',
  },
  {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    name: 'NodeNext',
  },
];

describe('published framework typings', () => {
  it.each(
    frameworkCases.flatMap((framework) =>
      moduleResolutionCases.map((resolution) => ({
        ...framework,
        ...resolution,
      }))
    )
  )(
    'type-checks $fileName with $name and rejects invalid custom-element APIs',
    ({ fileName, jsx, jsxImportSource, module, moduleResolution }) => {
      const program = ts.createProgram({
        rootNames: [path.join(fixtureRoot, fileName)],
        options: {
          jsx,
          jsxImportSource,
          experimentalDecorators: true,
          module,
          moduleResolution,
          noEmit: true,
          skipLibCheck: false,
          strict: true,
          target: ts.ScriptTarget.ES2022,
          types: ['vite/client'],
          useDefineForClassFields: false,
        },
      });
      const diagnostics = ts
        .getPreEmitDiagnostics(program)
        .filter((diagnostic) => {
          const diagnosticPath = diagnostic.file?.fileName;
          return (
            diagnosticPath === path.join(fixtureRoot, fileName) ||
            diagnosticPath?.startsWith(path.join(webRoot, 'src/types')) === true
          );
        });

      expect(
        ts.formatDiagnostics(diagnostics, {
          getCanonicalFileName: (name) => name,
          getCurrentDirectory: () => webRoot,
          getNewLine: () => '\n',
        })
      ).toBe('');
    }
  );

  it('publishes stable type-only framework subpaths', () => {
    const packageJson = JSON.parse(
      readFileSync(path.join(webRoot, 'package.json'), 'utf8')
    ) as {
      exports: Record<string, { types?: string; default?: string }>;
    };

    expect(packageJson.exports).toMatchObject({
      './react': { types: './types/react.d.ts' },
      './preact': { types: './types/preact.d.ts' },
      './solid': { types: './types/solid.d.ts' },
    });
  });
});
