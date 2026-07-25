import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/close-control';

const meta: Docs = {
  component: 'close-control-box',
  title: 'Components/Close control box',
  argTypes: {
    label: {
      control: 'text',
      description: 'Accessible label for screen readers',
    },
  },
  args: {
    label: 'Close dialog',
  },
  docs: {
    selector: 'close-control-box',
    className: 'CloseControl',
    attributes: {
      label: {
        type: 'string',
        description: 'Accessible label announced for the control.',
        defaultValue: 'Close',
      },
    },
    events: {
      close: {
        description: 'Emitted when the close control is activated.',
        detail: 'void',
      },
    },
    slots: {},
    cssProperties: {
      '--close-control-size': {
        description: 'Width and height of the button.',
        defaultValue: 'var(--component-close-control-size)',
      },
      '--close-control-border-width': {
        description: 'Border width around the button.',
        defaultValue: 'var(--component-close-control-border-width)',
      },
      '--close-control-background': {
        description: 'Background color in the resting state.',
        defaultValue: 'var(--box-model-background-elevated)',
      },
      '--close-control-background-hover': {
        description: 'Background color on hover.',
        defaultValue: 'var(--box-model-background-content)',
      },
      '--close-control-background-active': {
        description: 'Background color when pressed.',
        defaultValue: 'var(--box-model-background-sunken)',
      },
      '--close-control-border-color': {
        description: 'Border color of the control.',
        defaultValue: 'var(--box-model-border-strong)',
      },
      '--close-control-icon-color': {
        description: 'Stroke color of the close icon and focus ring.',
        defaultValue: 'var(--box-model-text-primary)',
      },
    },
    cssParts: {
      button: {
        description: 'Host button element that triggers the close event.',
      },
      icon: {
        description: 'Container for the SVG close icon.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ label }) => html`<close-control-box label="${label}"></close-control-box>`,
};
