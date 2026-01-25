import type { StoryObj as Story } from '@storybook/web-components';
import { html } from 'lit';
import { Docs } from '@box-model/storybook-utils';
import '@box-model/web/checkbox';

const meta: Docs = {
  component: 'checkbox-group-box',
  title: 'Components/Checkbox group box',
  argTypes: {
    legend: {
      control: 'text',
      description: 'Legend text announced to assistive tech.',
    },
  },
  args: {
    legend: 'Notification preferences',
  },
  docs: {
    selector: 'checkbox-group-box',
    className: 'CheckboxGroup',
    attributes: {
      legend: {
        type: 'string',
        description: 'Optional legend text describing the checkbox group.',
        defaultValue: '',
      },
    },
    slots: {
      legend: {
        description: 'Custom legend content for the group heading.',
      },
      '': {
        description: 'Checkbox inputs and labels composing the group options.',
      },
    },
    cssProperties: {},
    cssParts: {
      content: {
        description: 'Container wrapping the slotted checkbox options.',
      },
    },
    dependencies: {},
  },
};

export default meta;

export const Canvas: Story = {
  render: ({ legend }) => html`
    <checkbox-group-box legend="${legend}">
      <label>
        <input type="checkbox" name="notifications" value="email" checked />
        Email alerts
      </label>
      <label>
        <input type="checkbox" name="notifications" value="sms" />
        SMS alerts
      </label>
      <label>
        <input type="checkbox" name="notifications" value="push" />
        Push notifications
      </label>
    </checkbox-group-box>
  `,
};
