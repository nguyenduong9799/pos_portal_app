/** @type {import('tailwindcss').Config} */
module.exports = {
  // Content configuration - where to look for class names
  content: [
    './src/**/*.{html,ts,scss}',
    './src/**/*.component.html',
    './src/**/*.component.ts',
    './src/**/*.directive.ts',
    './src/**/*.pipe.ts'
  ],
  
  // Dark mode configuration
  darkMode: 'class', // or 'media' for automatic dark mode
  
  // Theme customization
  theme: {
    extend: {
      // Custom color palette
      colors: {
        'custom-primary': '#242e52',
        'custom-secondary': '#f75b37',
        'custom-accent': '#37cdbe',
        'custom-neutral': '#3d4451',
        'custom-base-400': '#ded6c4',
      },
      
      // Custom font families
      fontFamily: {
        'title': ['Century', 'ui-serif', 'Georgia', 'serif'],
        'body': ['IBM', 'system-ui', '-apple-system', 'sans-serif'],
        'icons': ['Material Symbols Outlined', 'monospace'],
      },
      
      // Custom spacing
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      // Custom animation
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      
      // Custom keyframes
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        }
      },
      
      // Custom screens
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  
  // Plugins
  plugins: [
    require('daisyui'),
    // Uncomment these if you want additional Tailwind plugins
    // require('@tailwindcss/forms'),
    // require('@tailwindcss/typography'),
  ],
  
  // DaisyUI configuration
  daisyui: {
    themes: [
      {
        // Custom light theme
        light: {
          'primary': '#242e52',
          'primary-content': '#ffffff',
          'secondary': '#f75b37',
          'secondary-content': '#ffffff',
          'accent': '#37cdbe',
          'accent-content': '#1f2937',
          'neutral': '#3d4451',
          'neutral-content': '#ffffff',
          'base-100': '#F4F2EE',
          'base-200': '#ffffff',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#3abff8',
          'info-content': '#002b3d',
          'success': '#36d399',
          'success-content': '#003320',
          'warning': '#fbbd23',
          'warning-content': '#382800',
          'error': '#f87272',
          'error-content': '#470000',
        },
      },
      {
        // Custom dark theme
        dark: {
          'primary': '#D4403B',
          'primary-content': '#ffffff',
          'secondary': '#e56645',
          'secondary-content': '#ffffff',
          'accent': '#37cdbe',
          'accent-content': '#002b3d',
          'neutral': '#3d4451',
          'neutral-content': '#ffffff',
          'base-100': '#2b2b2a',
          'base-200': '#1b1b1b',
          'base-300': '#374151',
          'base-content': '#ebecf0',
          'info': '#3abff8',
          'info-content': '#002b3d',
          'success': '#36d399',
          'success-content': '#003320',
          'warning': '#fbbd23',
          'warning-content': '#382800',
          'error': '#f87272',
          'error-content': '#470000',
        },
      },
      // Include some popular DaisyUI themes
      'cupcake',
      'bumblebee',
      'emerald',
      'corporate',
      'retro',
      'cyberpunk',
      'valentine',
      'halloween',
      'garden',
      'forest',
      'lofi',
      'pastel',
      'fantasy',
      'wireframe',
      'black',
      'luxury',
      'dracula',
    ],
    
    // DaisyUI settings
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ':root', // The element that receives theme color CSS variables
  },
};
