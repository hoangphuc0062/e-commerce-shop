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
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },

      backgroundColor: {
        main: "#1e40af",
        hv: "#fff3",
        darkMain: "#0d1b2a",
        grayColor: "#efefef",
        whiteColor: "#fff",
      },
      colors: {
        main: "#1e40af",
        semi: "#FFFFFF",
        darkText: "#e5e7eb",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
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
