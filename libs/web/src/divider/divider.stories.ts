import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/divider';

const orientations = ['horizontal', 'vertical'] as const;

const meta: Docs = {
  component: 'divider-box',
  title: 'Components/Divider box',
  argTypes: {
    orientation: {
      control: 'select',
      options: orientations,
      description: 'Orientation of the divider',
    },
  },
  args: {
    orientation: 'horizontal',
  },
  docs: {
    selector: 'divider-box',
    className: 'Divider',
    attributes: {
      orientation: {
        type: 'DividerOrientation',
        description: 'Orientation of the divider line.',
        defaultValue: 'horizontal',
        options: orientations,
      },
    },
    slots: {
      '': {
        description: 'Optional label content rendered alongside the divider.',
      },
    },
    cssProperties: {
      '--divider-color': {
        description: 'Color of the divider line.',
        defaultValue: 'var(--component-divider-color)',
      },
      '--divider-thickness': {
        description: 'Thickness of the divider line.',
        defaultValue: 'var(--component-divider-thickness)',
      },
      '--divider-spacing': {
        description: 'Margin applied around the divider.',
        defaultValue: 'var(--component-divider-spacing)',
      },
    },
    cssParts: {
      line: {
        description: 'The visual separator element.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ orientation }) => html`
    ${orientation === 'vertical'
      ? html`
          <div style="display: flex; flex-direction: column; gap: 1rem; min-height: 6rem;">
            <span>Alpha</span>
            <divider-box orientation="vertical"></divider-box>
            <span>Bravo</span>
          </div>
        `
      : html`
          <div style="display: flex; align-items: center; gap: 1rem; min-height: 4rem;">
            <span>Alpha</span>
            <divider-box></divider-box>
            <span>Bravo</span>
          </div>
        `}
  `,
};
