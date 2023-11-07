import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      margin: {
        '76': '308px',
      },
    },
  },
  variants: {
    extend: {
      position: ['group-hover'],
      right: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
