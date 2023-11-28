/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        white: '#FFFFFF',
        greenFooter: '#CEF7A0',
        amarilloCode: '#F1FA8C',
        azulCode: '#8BE9DD',
        morado: '#C1ACF6',
        lightGrey: '#999999',
        chillGrey: '#D9D9D9',
        marronPocho: '#BCABAE',
        azulVolume: '#7EBDC3',
        pinkVolume: '#EDCACF',
        pinkDarkVolume: '#D49AA3',
        blueVolume: '#7EBDC3'
      },
      dropShadow:{
        'slim': '0 0 5px rgba(0, 0, 0, 0.5)',
        'dark': '0 0 10px rgba(0, 0, 0, 0.5)',
        'darker': '0 5px 10px rgba(0, 0, 0, 0.75)',
        'content': '5px 0 10px rgba(0,0,0,0.75)',
        'top-s': '0 -5px 10px rgba(0,0,0,0.5)',
        'bar': '2px 0 2px rgba(0,0,0,0.25)'
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
      'ubuntu': ['Ubuntu'],
      'loos': ['Kanit']
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],

}

