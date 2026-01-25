const LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="240" viewBox="0 0 320 240" role="img" aria-labelledby="title desc">
  <title id="title">Box Model Logo</title>
  <desc id="desc">Margin, border, padding, and content bands styled to mirror browser developer tools box model.</desc>
  <style>
    :root {
      --margin-fill: var(--box-model-box-margin-background, #b08354);
      --border-fill: var(--box-model-box-border-background, #e4c482);
      --padding-fill: var(--box-model-box-padding-background, #b8c480);
      --content-fill: var(--box-model-box-content-background, #88b2bd);
      --stroke: var(--box-model-border-default, #000000);
      --text: var(--box-model-text-primary, #000);
    }
    text {
      font-family: Consolas, monospace;
      font-size: 16px;
      fill: var(--text);
      letter-spacing: 0.5px;
      text-transform: lowercase;
      font-weight: 400;
      text-anchor: start;
    }
    .value {
      font-size: 16px;
      letter-spacing: 0;
      font-weight: 400;
      text-anchor: middle;
    }
  </style>

  <rect x="16" y="22" width="288" height="196" fill="var(--margin-fill)" stroke="var(--stroke)" stroke-width="1" stroke-dasharray="4 2" />
  <text x="22" y="40">margin</text>
  <text class="value" x="160" y="40">0</text>
  <text class="value" x="160" y="208">0</text>
  <text class="value" x="30" y="125">0</text>
  <text class="value" x="290" y="125">0</text>

  <rect x="44" y="50" width="232" height="140" fill="var(--border-fill)" stroke="var(--stroke)" stroke-width="1" />
  <text x="52" y="68">border</text>
  <text class="value" x="160" y="68">0</text>
  <text class="value" x="160" y="180">0</text>
  <text class="value" x="58" y="125">0</text>
  <text class="value" x="262" y="125">0</text>

  <rect x="72" y="78" width="176" height="84" fill="var(--padding-fill)" stroke="var(--stroke)" stroke-width="1" stroke-dasharray="4 2" />
  <text x="80" y="96">padding</text>
  <text class="value" x="160" y="96">0</text>
  <text class="value" x="160" y="152">0</text>
  <text class="value" x="86" y="125">0</text>
  <text class="value" x="234" y="125">0</text>

  <rect x="100" y="106" width="120" height="28" fill="var(--content-fill)" stroke="var(--stroke)" stroke-width="1" />
  <text class="value" x="160" y="125">320 x 240</text>
</svg>`;

export const BOX_MODEL_LOGO_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(LOGO_SVG)}`;
