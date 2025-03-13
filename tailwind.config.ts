import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        surface: "var(--surface)",
        secondary: "var(--secondary)",
        darkText: "var(--darkText)",
        lightText: "var(--lightText)",
        info: "var(--info)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        gradientBg: "var(--gradientBg)",
        action: "var(--action)",
        lightError: "var(--lightError)",
        lightSuccess: "var(--lightSuccess)",
        lightWarning: "var(--lightWarning)",
        lightInfo: "var(--lightInfo)",
        inputBackground: "var(--inputBackground)",
        inputBorder: "var(--inputBorder)",
        formBackground:'var(--formBackground)'
      },
    },
  },
  plugins: [],
} satisfies Config;
