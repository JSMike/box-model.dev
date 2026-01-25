import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/radio';

const meta: Docs = {
  component: 'radio-group-box',
  title: 'Components/Radio group box',
  argTypes: {
    legend: {
      control: 'text',
      description: 'Legend describing the radio group.',
    },
  },
  args: {
    legend: 'Billing frequency',
  },
  docs: {
    selector: 'radio-group-box',
    className: 'RadioGroup',
    attributes: {
      legend: {
        type: 'string',
        description: 'Optional legend text describing the radio group.',
        defaultValue: '',
      },
    },
    slots: {
      legend: {
        description: 'Custom legend content for the group heading.',
      },
      '': {
        description: 'Radio inputs and labels composing the group options.',
      },
    },
    cssProperties: {},
    cssParts: {
      content: {
        description: 'Container wrapping the slotted radio options.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ legend }) => html`
    <radio-group-box legend="${legend}">
      <label>
        <input type="radio" name="billing" value="monthly" checked />
        Monthly
      </label>
      <label>
        <input type="radio" name="billing" value="quarterly" />
        Quarterly
      </label>
      <label>
        <input type="radio" name="billing" value="annual" />
        Annual
      </label>
    </radio-group-box>
  `,
};
