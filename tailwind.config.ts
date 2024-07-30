import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main: 'var(--main)',
        'main-10': 'var(--main-10)',
        black: 'var(--black)',
        white: 'var(--white)',
        'grayscale-100': 'var(--grayscale-100)',
        'grayscale-300': 'var(--grayscale-300)',
        'grayscale-500': 'var(--grayscale-500)',
        'grayscale-800': 'var(--grayscale-800)',
      },
    },
  },
  plugins: [],
};
export default config;
