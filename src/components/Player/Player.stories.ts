import type { Meta, StoryObj } from '@storybook/react';

import { Player } from '../Player/Player';

const meta: Meta = {
  title: 'Components/Player',
  component: Player,
  tags: ['autodocs'],
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
