import { collectComponentMetadata } from './component-metadata.js';
import { emitCustomElementsManifest } from './custom-elements.js';
import { emitPreactTypings } from './preact.js';
import { emitReactTypings } from './react.js';
import { emitSolidTypings } from './solid.js';
import { emitTagNameMaps } from './tag-name-map.js';

async function main() {
  const metadata = await collectComponentMetadata();
  await emitTagNameMaps(metadata);
  await emitReactTypings(metadata);
  await emitPreactTypings(metadata);
  await emitSolidTypings(metadata);
  await emitCustomElementsManifest(metadata, {
    strict: process.env.CEM_STRICT === '1',
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
