import { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config = {
  darkMode: ['selector', 'html[data-mantine-color-scheme="dark"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true
    },
    extend: {
      borderWidth: {
        DEFAULT: '0.0625rem'
      },
      fontSize: {
        xxs: '0.65rem'
      },
      colors: {
        dimmed: {
          DEFAULT: 'var(--mantine-color-dimmed)'
        },
        card: {
          DEFAULT: 'var(--card)'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant('light', `html[data-mantine-color-scheme="light"] &`);
    })
  ],
  future: {
    hoverOnlyWhenSupported: true
  }
} satisfies Config;

export default config;
