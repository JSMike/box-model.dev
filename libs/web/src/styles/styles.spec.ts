import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compile, compileString } from 'sass';

describe('published web styles', () => {
  it('compile using only the styles included with @box-model/web', () => {
    const stylesDirectory = path.dirname(fileURLToPath(import.meta.url));
    const result = compile(path.join(stylesDirectory, 'box-model.scss'), {
      loadPaths: [stylesDirectory],
    });

    expect(result.css).to.contain(':root');
    expect(result.css).to.contain('--box-model-background-canvas');
    expect(result.css).to.contain('.box-model-surface');
    expect(result.css).to.contain('--box-model-surface-shadow');
    expect(result.css).to.contain('@media (forced-colors: active)');
  });

  it('exposes a configurable surface mixin with light theme fallbacks', () => {
    const stylesDirectory = path.dirname(fileURLToPath(import.meta.url));
    const result = compileString(
      `
        @use 'surface';

        .light-region {
          @include surface.offset-theme(light);
        }

        .review-surface {
          @include surface.frame(prominent, light);
        }
      `,
      {
        loadPaths: [stylesDirectory],
      }
    );

    expect(result.css).to.contain('.review-surface');
    expect(result.css).to.contain('--box-model-shadow-offset-md');
    expect(result.css).to.contain('.light-region');
    expect(result.css).to.contain('0.25rem 0.25rem 0 #cfe0e5');
    expect(result.css).to.contain('var(--box-model-surface-shadow)');
    expect(result.css).to.contain('border-radius: 0');
    expect(result.css).not.to.contain('.box-model-surface');
  });
});
