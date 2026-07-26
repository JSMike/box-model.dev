import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/progress';

const meta: Docs = {
  component: 'progress-box',
  title: 'Components/Progress box',
  argTypes: {
    value: {
      control: { type: 'number', min: 0, max: 100 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number', min: 1, max: 100 },
      description: 'Maximum progress value',
    },
    label: {
      control: 'text',
      description: 'Accessible name announced for the progressbar',
    },
    visibleLabel: {
      control: 'text',
      description: 'Optional visible label rendered above the bar',
    },
  },
  args: {
    value: 60,
    max: 100,
    label: 'File upload progress',
    visibleLabel: 'Uploading assets…',
  },
  docs: {
    selector: 'progress-box',
    className: 'Progress',
    attributes: {
      value: {
        type: 'number',
        description: 'Current progress value; clamped between 0 and max.',
        defaultValue: 0,
      },
      max: {
        type: 'number',
        description: 'Maximum progress value used to compute the percentage.',
        defaultValue: 100,
      },
      label: {
        type: 'string',
        description: 'Accessible name applied to the internal progressbar.',
        defaultValue: 'Progress',
      },
    },
    slots: {
      '': {
        description:
          'Optional visible label displayed above the track; set `label` separately for the accessible name.',
      },
    },
    cssProperties: {
      '--progress-height': {
        description: 'Height of the progress bar track.',
        defaultValue: 'var(--component-progress-height)',
      },
      '--progress-track': {
        description: 'Background color for the track.',
        defaultValue: 'var(--component-progress-track)',
      },
      '--progress-indicator': {
        description: 'Fill color for the indicator.',
        defaultValue: 'var(--component-progress-indicator)',
      },
      '--progress-radius': {
        description: 'Corner radius applied to the track and indicator.',
        defaultValue: 'var(--component-progress-radius)',
      },
      '--progress-animation-duration': {
        description: 'Transition duration when the indicator width changes.',
        defaultValue: 'var(--component-progress-animation-duration)',
      },
    },
    cssParts: {
      header: {
        description: 'Wrapper containing the label slot and percent value.',
      },
      percent: {
        description: 'Element showing the computed percentage.',
      },
      track: {
        description: 'The progress track element with `role="progressbar"`.',
      },
      indicator: {
        description: 'The filled bar indicating progress.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ value, max, label, visibleLabel }) => html`
    <progress-box .value=${value} .max=${max} label=${label}>
      ${visibleLabel ? html`<span>${visibleLabel}</span>` : ''}
    </progress-box>
  `,
};
