import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0f141b',
        panel: '#161e29',
        muted: '#8c99ad',
        accent: '#4f8cff',
      },
    },
  },
  plugins: [],
};

export default config;
