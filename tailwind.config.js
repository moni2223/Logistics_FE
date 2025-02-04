/** @type {import('tailwindcss').Config} */

/*eslint-disable*/
const defaultTheme = require("tailwindcss/defaultTheme");
export default {
  content:  ["./index.html", "./src/**/*.{js,ts,jsx,tsx,scss}"],
  theme: {
    extend: {
      colors: {
        whitish: "#F2F2F2",
        text: "#03191c",
        border: "#dce1e8",
        shadow: "#03191c16",
        custom_green: "#B5E550",
        custom_green_dark:"#037B59",
        custom_green_light: "#e3fff5",
        custom_red: "#e60050",
        custom_red_light: "#ffe8f0",
        custom_blue: "#00d0e6",
        custom_blue_light: "#e8fdff",
        custom_darkblue:"#061445",
      },
      fontFamily: {
        sans: ["FireSans", "sans-serif"],
      },
      animation: {
        bounce: "bounce 0.6s infinite",
      },
      height: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/8": "12.5%",
        "2/8": "25%",
        "3/8": "37.5%",
        "1/12": "8.2%",
      },
      width: {
        "1/10": "10%",
        "2/10": "20%",
        "3/10": "30%",
        "4/10": "40%",
        "5/10": "50%",
        "6/10": "60%",
        "7/10": "70%",
        "8/10": "80%",
        "9/10": "90%",
        "1/8": "12.5%",
      },
      borderWidth: {
        DEFAULT: "1px",
      },
      boxShadow: {
        sm: "0px 1px 4px 0px #03191c16",
        lg: "0px 5px 15px 0px #03191c16",
      },
      boxShadow: {
        custom: "0 3px 6px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        half: "50%",
      },
    },
    screens: {
      "3xl": "3440px",
      "xl": "1340px",
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
