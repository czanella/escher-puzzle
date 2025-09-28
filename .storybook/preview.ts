import type { Preview } from '@storybook/nextjs-vite';
import { themes } from 'storybook/theming';

import './storybook-global-style.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    layout: 'centered',
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;