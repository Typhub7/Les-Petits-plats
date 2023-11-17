/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./css/*.css",
  ],  
  theme: {
    extend: {
      width: { 
      '1440': '1440px', 
      },
      height: {
      '666' : '666px'
      },
      backgroundImage: {
        'background-plate': "url('/assets/header_background.jpg')"
      },    
      borderRadius: {
        'md': '0.688rem',
      }

    },
  },
  plugins: [],
}

