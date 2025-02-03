import { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  prefix: "tw-",
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {},
  plugins: [require("tailwindcss-animate")],
};

export default config;
