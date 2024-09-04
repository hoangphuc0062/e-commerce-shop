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
        darkMain: "#0d1b2a"
      },
      colors: {
        main: "#1e40af",
        semi: "#FFFFFF",
        darkText: "#e5e7eb"
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
