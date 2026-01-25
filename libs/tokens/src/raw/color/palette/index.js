export { border } from './border.js';
export { content } from './content.js';
export { error } from './error.js';
export { margin } from './margin.js';
export { padding } from './padding.js';
export { surface } from './surface.js';

import { border } from './border.js';
import { content } from './content.js';
import { error } from './error.js';
import { margin } from './margin.js';
import { padding } from './padding.js';
import { surface } from './surface.js';

export default {
  color: {
    palette: {
      $type: 'color',
      border,
      content,
      error,
      margin,
      padding,
      surface,
    },
  },
};
