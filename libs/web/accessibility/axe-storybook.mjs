import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import { readFile, stat } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { chromium } from '@playwright/test';

const require = createRequire(import.meta.url);
const storybookRoot = resolve('dist/storybook/web');
const axeSource = await readFile(
  require.resolve('axe-core/axe.min.js'),
  'utf8'
);
const storyIndex = JSON.parse(
  await readFile(join(storybookRoot, 'index.json'), 'utf8')
);
const canvasStories = Object.values(storyIndex.entries).filter(
  (entry) => entry.type === 'story' && entry.name === 'Canvas'
);

const contentTypes = new Map([
  ['.css', 'text/css'],
  ['.html', 'text/html'],
  ['.js', 'text/javascript'],
  ['.json', 'application/json'],
  ['.svg', 'image/svg+xml'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(
      new URL(request.url ?? '/', 'http://localhost').pathname
    );
    const relativePath = pathname === '/' ? 'index.html' : pathname.slice(1);
    const filePath = normalize(join(storybookRoot, relativePath));

    if (
      filePath !== storybookRoot &&
      !filePath.startsWith(`${storybookRoot}${sep}`)
    ) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    const resolvedPath = fileStat.isDirectory()
      ? join(filePath, 'index.html')
      : filePath;
    const body = await readFile(resolvedPath);

    response.writeHead(200, {
      'content-type':
        contentTypes.get(extname(resolvedPath)) ?? 'application/octet-stream',
    });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
});

await new Promise((resolveListening) => server.listen(0, resolveListening));
const address = server.address();

if (address === null || typeof address === 'string') {
  server.close();
  throw new Error('Unable to start the Storybook accessibility server.');
}

const browser = await chromium.launch({
  executablePath:
    process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH ||
    (existsSync('/usr/bin/google-chrome')
      ? '/usr/bin/google-chrome'
      : undefined),
  headless: true,
});
const failures = [];

try {
  const page = await browser.newPage();

  for (const theme of ['light', 'dark']) {
    for (const story of canvasStories) {
      const storyUrl =
        `http://127.0.0.1:${address.port}/iframe.html` +
        `?id=${encodeURIComponent(story.id)}` +
        `&viewMode=story&globals=theme:${theme}`;

      await page.goto(storyUrl, { waitUntil: 'networkidle' });
      await page.locator('#storybook-root').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.addScriptTag({ content: axeSource });

      const violations = await page.evaluate(async () => {
        const root = document.querySelector('#storybook-root');

        if (root === null) {
          throw new Error('Storybook root was not rendered.');
        }

        return (
          await globalThis.axe.run(root, {
            runOnly: {
              type: 'tag',
              values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
            },
          })
        ).violations;
      });

      for (const violation of violations) {
        failures.push({
          theme,
          story: `${story.title}/${story.name}`,
          id: violation.id,
          impact: violation.impact,
          help: violation.help,
          targets: violation.nodes.flatMap((node) => node.target),
        });
      }
    }
  }
} finally {
  await browser.close();
  await new Promise((resolveClosed) => server.close(resolveClosed));
}

if (failures.length > 0) {
  console.error(JSON.stringify(failures, null, 2));
  process.exitCode = 1;
} else {
  console.log(
    `Axe passed for ${canvasStories.length} Canvas stories in light and dark themes.`
  );
}
