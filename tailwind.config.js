/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    // Sidebar states
    'lg:ml-[12.75%]',
    'lg:w-[calc(100%-12.75%)]',
    'lg:ml-[80px]',
    'lg:w-[calc(100%-80px)]',
    // Sidebar + Default panel (16rem)
    'lg:ml-[calc(12.75%+16rem)]',
    'lg:w-[calc(100%-12.75%-16rem)]',
    // Sidebar + Routes panel (24rem)
    'lg:ml-[calc(12.75%+24rem)]',
    'lg:w-[calc(100%-12.75%-24rem)]',
    'lg:ml-[calc(80px+24rem)]',
    'lg:w-[calc(100%-80px-24rem)]',
    // TopNav positions
    'lg:left-[12.75%]',
    'lg:left-[80px]',
    'lg:left-[calc(12.75%+16rem)]',
    'lg:left-[calc(12.75%+24rem)]',
    'lg:left-[calc(80px+24rem)]',
    'lg:right-0',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#62256e',
      },
    },
  },
  plugins: [],
}

