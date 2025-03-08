/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a365d',    // 深蓝色
        secondary: '#2b6cb0',  // 中蓝色
        accent: '#ed8936',     // 橙色强调色
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
        serif: ['var(--font-merriweather)', 'Georgia'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('daisyui')
  ],
  daisyui: {
    themes: [
      {
        szmun: {
          primary: '#1a365d',
          secondary: '#2b6cb0',
          accent: '#ed8936',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        },
      },
    ],
  },
} 