import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "seafoam": {
          50: "#f3fbf7",
          100: "#e1f7ef",
          200: "#c1ecd9",
          300: "#9fdcc3",
          400: "#7cccae",
          500: "#56b896",
          600: "#3a9c7b",
          700: "#2c7a62",
          800: "#235f4d",
          900: "#1c4c3d"
        },
        "sky": {
          50: "#f2f8ff",
          100: "#e1f0ff",
          200: "#c2e0ff",
          300: "#a0cefb",
          400: "#7ab3f3",
          500: "#4f92e3",
          600: "#3472c2",
          700: "#285a99",
          800: "#234c7c",
          900: "#1f4167"
        }
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans]
      },
      boxShadow: {
        glow: "0 10px 30px -12px rgba(79, 146, 227, 0.45)"
      }
    }
  },
  plugins: [require("@tailwindcss/forms")]
};

export default config;
