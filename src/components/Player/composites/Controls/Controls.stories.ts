import type { Meta, StoryObj } from '@storybook/react';

import Controls from './Controls';

const meta: Meta = {
  title: 'Components/Controls',
  component: Controls,
  tags: ['autodocs'],
} satisfies Meta<typeof Controls>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
