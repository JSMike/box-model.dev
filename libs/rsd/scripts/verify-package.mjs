import assert from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { build } from 'vite';

const workspaceRoot = fileURLToPath(new URL('../../..', import.meta.url));
const packageRoot = path.join(workspaceRoot, 'dist/libs/rsd');
const packageJson = JSON.parse(
  await readFile(path.join(packageRoot, 'package.json'), 'utf8')
);

assert.deepEqual(packageJson.exports['./styles'], {
  types: './styles/index.d.ts',
  default: './styles.css',
});
assert.deepEqual(packageJson.exports['./styles.css'], {
  types: './styles/index.d.ts',
  default: './styles.css',
});
assert.equal(packageJson.exports['./styles.js'], undefined);
assert.deepEqual(packageJson.sideEffects, ['./styles.css']);

const stylesheet = await readFile(path.join(packageRoot, 'styles.css'), 'utf8');
assert.ok(
  stylesheet.length > 1_000,
  'The packaged stylesheet is unexpectedly empty.'
);

const consumerRoot = await mkdtemp(
  path.join(os.tmpdir(), 'box-model-rsd-package-')
);

try {
  const packageScope = path.join(consumerRoot, 'node_modules/@box-model');
  await mkdir(packageScope, { recursive: true });
  await symlink(packageRoot, path.join(packageScope, 'rsd'), 'dir');
  await writeFile(
    path.join(consumerRoot, 'index.html'),
    '<main id="app"></main><script type="module" src="/main.ts"></script>\n'
  );
  const consumerEntry = path.join(consumerRoot, 'main.ts');
  await writeFile(
    consumerEntry,
    "import '@box-model/rsd/styles';\nimport { Button } from '@box-model/rsd/button';\nvoid Button;\n"
  );

  const typeCheck = ts.createProgram(
    [consumerEntry, path.join(workspaceRoot, 'node_modules/vite/client.d.ts')],
    {
      module: ts.ModuleKind.ESNext,
      moduleResolution: ts.ModuleResolutionKind.Bundler,
      noEmit: true,
      skipLibCheck: true,
      target: ts.ScriptTarget.ES2022,
    }
  );
  const diagnostics = ts.getPreEmitDiagnostics(typeCheck);
  assert.equal(
    diagnostics.length,
    0,
    ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: () => consumerRoot,
      getNewLine: () => '\n',
    })
  );

  await build({
    root: consumerRoot,
    logLevel: 'silent',
    resolve: {
      alias: {
        'react-native': 'react-native-web',
      },
    },
    build: {
      outDir: 'build',
    },
  });

  const assetDirectory = path.join(consumerRoot, 'build/assets');
  const cssAssets = (await readdir(assetDirectory)).filter((file) =>
    file.endsWith('.css')
  );
  assert.equal(
    cssAssets.length,
    1,
    'The consumer build did not emit exactly one stylesheet.'
  );
  const consumerStyles = await readFile(
    path.join(assetDirectory, cssAssets[0]),
    'utf8'
  );
  assert.ok(
    consumerStyles.includes('@layer priority'),
    'The consumer stylesheet does not contain the packaged RSD styles.'
  );
} finally {
  await rm(consumerRoot, { recursive: true, force: true });
}

console.log(
  'Verified the packed RSD stylesheet export with a standalone TypeScript/Vite consumer.'
);
