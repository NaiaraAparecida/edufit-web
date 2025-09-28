import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:   '#6D28D9',
        secondary: '#10B981',
        accent:    '#F59E0B',
        bg:        '#F8FAFC',
        card:      '#FFFFFF',
        text:      '#0F172A',
        muted:     '#64748B',
        border:    '#E2E8F0',
        danger:    '#EF4444',
        success:   '#22C55E',
      },
      borderRadius: {
        sm: '6px',
        md: '12px',
        lg: '20px',
        pill: '999px',
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
        '2xl': '32px',
      },
      fontFamily: {
        regular: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        medium:  ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        bold:    ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        md: ['16px', '24px'],
        lg: ['20px', '28px'],
        xl: ['24px', '32px'],
        '2xl': ['32px', '40px'],
      },
      boxShadow: {
        card: '0 4px 14px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
export default config;
