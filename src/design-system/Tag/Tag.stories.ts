import type { Meta, StoryObj } from '@storybook/react';

import { Tag } from './Tag';

const meta: Meta = {
  title: 'Components/Tag',
  component: Tag,
  tags: ['autodocs'],
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
Primary.args = {
  label: 'rock',
};

export const Secondary: Story = {};
Secondary.args = {
  label: 'rock',
  background: 'blue',
};
