import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

describe('terminal-line-box styles', () => {
  const stylesDirectory = path.dirname(fileURLToPath(import.meta.url));
  const hostStyles = readFileSync(
    path.join(stylesDirectory, 'terminal-line.host.scss'),
    'utf8'
  );

  it('uses an accent color for the prompt instead of the success color', () => {
    expect(hostStyles).to.match(
      /theme\.custom-property\(\s*'terminal-line-prompt',\s*'box-model-text-accent'\s*\)/
    );
  });

  it('applies each status color to both its glyph and content', () => {
    expect(hostStyles).to.match(
      /:host\(\[variant='success'\]\) \.terminal-line__prompt\s*\{\s*color: var\(--terminal-line-success\)/
    );
    expect(hostStyles).to.match(
      /:host\(\[variant='success'\]\) \.terminal-line__content\s*\{\s*color: var\(--terminal-line-success\)/
    );
    expect(hostStyles).to.match(
      /:host\(\[variant='info'\]\) \.terminal-line__prompt\s*\{\s*color: var\(--terminal-line-info\)/
    );
    expect(hostStyles).to.match(
      /:host\(\[variant='info'\]\) \.terminal-line__content\s*\{\s*color: var\(--terminal-line-info\)/
    );
  });
});
