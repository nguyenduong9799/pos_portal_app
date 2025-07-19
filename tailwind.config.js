/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,scss}"
  ],
  theme: {
    extend: {
      colors: {
        'custom-primary': '#242e52',
        'custom-secondary': '#f75b37',
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#242e52",
          "secondary": "#f75b37", 
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#F4F2EE",
          "base-200": "#ffffff",
          "base-300": "#d1d5db",
          "base-content": "#1f2937",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
      {
        dark: {
          "primary": "#D4403B",
          "secondary": "#e56645", 
          "accent": "#37cdbe",
          "neutral": "#3d4451",
          "base-100": "#2b2b2a",
          "base-200": "#1b1b1b",
          "base-300": "#374151",
          "base-content": "#ebecf0",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      }
    ],
    darkTheme: "dark",
    base: true,
    styled: true,
    utils: true,
    prefix: "",
    logs: false,
    themeRoot: ":root",
  },
};
