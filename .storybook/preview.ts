import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import type { Preview } from '@storybook/react';
// eslint-disable-next-line import/no-relative-parent-imports
import '@/styles/fonts.css';
import '@/index.css';

const customViewports = {
  smally: {
    name: 'smally',
    styles: {
      width: '100px',
      height: '963px',
    },
  },
  ...INITIAL_VIEWPORTS,
};

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport: {
      viewports: customViewports,
    },
  },
};

export default preview;
