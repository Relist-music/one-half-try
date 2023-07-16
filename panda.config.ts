import { defineConfig } from '@pandacss/dev';
import { preset as presetPanda } from '@pandacss/preset-panda';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
    './pages/**/*.{js,jsx,ts,tsx}',
    './stories/**/*.{js,jsx,ts,tsx}',
  ],

  // Files to exclude
  exclude: [],

  //

  // Useful for theme customization
  theme: {
    tokens: {
      ...presetPanda.theme.tokens,
      colors: {
        primary: {
          value: '#1B2326',
          description: 'Primary color for background',
        },
        dark: {
          value: '#0F1112',
          description: 'Dark color for background, make primary outstand',
        },
        grey: {
          ...presetPanda.theme.tokens.colors.gray,
        },
        black: {
          ...presetPanda.theme.tokens.colors.black,
        },
        white: {
          ...presetPanda.theme.tokens.colors.white,
        },
      },
      fonts: {
        tag: { value: 'apfel-grotezk' },
      },
    },
  },
  jsxFramework: 'react',

  // The output directory for your css system
  outdir: 'src/styled-system',

  globalCss: {
    'html, body': {
      color: 'white',
    },
  },

  gitignore: true,
});
