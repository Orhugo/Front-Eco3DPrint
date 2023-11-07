/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow:{
        'dark': '0 0 10px rgba(0, 0, 0, 0.5)',
        'darker': '0 5px 10px rgba(0, 0, 0, 0.75)',
        'content': '5px 0 10px rgba(0,0,0,0.75)',
      },
      boxShadow:{
        'dark': '0 3px 10px rgba(0, 0, 0, 0.5)',
        'darker': '0 5px 10px rgba(0, 0, 0, 0.75)',
        'content': '5px 0 15px rgba(0,0,0,0.75), -5px 0 15px rgba(0,0,0,0.75)',
        'dark-spread': '0 3px 20px rgba(0, 0, 0, 0.5)',
      },
      scale:{
        'small': '1.01',
        'mid': '1.05',
        'big': '1.1',
      },
    },
    fontFamily: {
      'ubuntu': ['Ubuntu']
    },
  },
  plugins: [],

}

