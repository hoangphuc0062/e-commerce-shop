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
        main: "#1e40af",
        hv: "#fff3",
      },
      colors: {
        main: "#1e40af",
        semi: "#FFFFFF",
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
