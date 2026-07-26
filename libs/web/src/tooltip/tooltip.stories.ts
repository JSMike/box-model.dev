import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/tooltip';
import '@box-model/web/status-icon';

const placements = ['top', 'bottom', 'left', 'right'] as const;

const meta: Docs = {
  component: 'tooltip-box',
  title: 'Components/Tooltip box',
  argTypes: {
    text: {
      control: 'text',
      description: 'Tooltip content',
    },
    label: {
      control: 'text',
      description: 'Accessible label for the default trigger.',
    },
    defaultPlacement: {
      control: { type: 'select' },
      options: placements,
      name: 'default-placement',
      description: 'Placement for the tooltip content.',
    },
  },
  args: {
    text: 'Tooltips provide extra context on hover or focus.',
    label: 'More information',
    defaultPlacement: 'top',
  },
  docs: {
    selector: 'tooltip-box',
    className: 'Tooltip',
    attributes: {
      label: {
        type: 'string',
        description: 'Accessible label applied to the default trigger.',
        defaultValue: 'More information',
      },
      'default-placement': {
        type: "'top' | 'bottom' | 'left' | 'right'",
        description: 'Preferred placement for the tooltip content.',
        defaultValue: 'top',
        options: placements,
      },
    },
    slots: {
      trigger: {
        description: 'Custom trigger element; if omitted a default “?” trigger is rendered.',
      },
      '': {
        description: 'Tooltip content.',
      },
    },
    cssProperties: {
      '--tooltip-background': {
        description: 'Background color of the tooltip surface.',
        defaultValue: 'var(--box-model-background-surface)',
      },
      '--tooltip-text-color': {
        description: 'Text color within the tooltip.',
        defaultValue: 'var(--box-model-text-primary)',
      },
      '--tooltip-border-radius': {
        description: 'Corner radius of the tooltip surface.',
        defaultValue: 'var(--component-tooltip-border-radius)',
      },
      '--tooltip-padding': {
        description: 'Padding inside the tooltip surface.',
        defaultValue: 'var(--component-tooltip-padding)',
      },
      '--tooltip-shadow': {
        description: 'Shadow applied to the tooltip surface.',
        defaultValue: 'var(--component-tooltip-shadow)',
      },
      '--tooltip-font-family': {
        description: 'Font family for tooltip text.',
        defaultValue: 'var(--typography-roles-caption-font-family)',
      },
      '--tooltip-font-size': {
        description: 'Font size for tooltip text.',
        defaultValue: 'var(--typography-roles-caption-font-size)',
      },
      '--tooltip-font-weight': {
        description: 'Font weight for tooltip text.',
        defaultValue: 'var(--typography-roles-caption-font-weight)',
      },
      '--tooltip-line-height': {
        description: 'Line height for tooltip text.',
        defaultValue: 'var(--typography-roles-caption-line-height)',
      },
      '--tooltip-letter-spacing': {
        description: 'Letter spacing for tooltip text.',
        defaultValue: 'var(--typography-roles-caption-letter-spacing)',
      },
      '--tooltip-offset': {
        description: 'Offset used when positioning the tooltip.',
        defaultValue: '0.5rem',
      },
    },
    cssParts: {
      container: {
        description: 'Wrapper that positions trigger and content.',
      },
      'trigger-wrapper': {
        description: 'Wrapper around the trigger slot or fallback trigger.',
      },
      trigger: {
        description: 'Fallback trigger element rendered when no trigger slot is provided.',
      },
      content: {
        description: 'Tooltip surface containing the content slot.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ text, label, defaultPlacement }) => html`
    <tooltip-box label="${label}" default-placement="${defaultPlacement}">
      <status-icon-box slot="trigger" variant="info" label="Show help">
        ?
      </status-icon-box>
      <span>${text}</span>
    </tooltip-box>

    <tooltip-box default-placement="${defaultPlacement}">
      <span slot="trigger">
        Read the fine print
      </span>
      <span>This tooltip follows the selected placement and only appears on hover or focus.</span>
    </tooltip-box>
  `,
  decorators: [
    (Story) => html` <div style="display: flex; gap: 2rem; justify-content: center; padding: 2rem;">
      ${Story()}
    </div> `,
  ],
};
