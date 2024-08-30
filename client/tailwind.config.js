/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ["Poppins", "sans-serif"],
    },
    extend: {
      container: {
        center: true,
      },
      width: {
        main: "1220px",
      },
      backgroundColor: {
        main: "303030",
      },
      colors: {
        dark: "485fc7",
        error: "#FF0000",
        semi: "#F1613F",
        grayColor: "#F5F5F5",
      },
      flex: {
        2: "2 2 0%",
        3: "3 3 0%",
        4: "4 4 0%",
        5: "5 5 0%",
      },
    },
  },
  plugins: [],
};
