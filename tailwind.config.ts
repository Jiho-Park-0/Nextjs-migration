/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");
import colors from "tailwindcss/colors";

module.exports = withMT({
  content: ["./src/**/*.{html,ts,js,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "inner-black": "inset 0 0 20px rgb(188 28 28)",
      },
      colors: {
        "primary-100": "#FFD7AC",
        "primary-200": "#996633",
        "primary-300": "#6D421A",
        "primary-400": "#3A2716",
        "primary-450": "#281910",
        "primary-500": "#170C0A",
        yi: "#D4E1E8",
        fau: "#FFB1B4",
        don: "#FFEF23",
        ryo: "#CF0000",
        meu: "#293B95",
        hong: "#5BFFDE",
        heath: "#4E3076",
        ish: "#FF9500",
        rodi: "#820000",
        sinc: "#8B9C15",
        outis: "#325339",
        greg: "#69350B",
        "grade-1": colors.gray[400],
        "grade-2": "#FF0000",
        "grade-3": "#FFEF23",
        "res-red": "#8A3126", // 분노
        "res-orange": "#B3622E", // 색욕
        "res-yellow": "#E48800", // 나태
        "res-green": "#618129", // 탐식
        "res-blue": "#316672", // 우울
        "res-navy": "#175184", // 오만
        "res-purple": "#653E76", // 질투
      },
      fontFamily: {
        sans: ["GmarketSansMedium", "Roboto", "sans-serif"],
        title: ["KOTRA_BOLD", "sans-serif"],
        sansBold: ["GmarketSansBold", "sans-serif"],
        sansLight: ["GmarketSansLight", "sans-serif"],
        number: ["HSSaemaul-Regular", "sans-serif"],
        eng: ["SEBANG Gothic", "sans-serif"],
        content: ["SCDream5", "sans-serif"],
      },
    },
  },
  plugins: [],
});
