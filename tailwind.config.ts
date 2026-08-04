import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/features/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eefdf9",
          100: "#d4fbf1",
          200: "#acf4e4",
          300: "#72e8d1",
          400: "#32d2b8",
          500: "#17b79f",
          600: "#0f927f",
          700: "#107467",
          800: "#125c53",
          900: "#144c46"
        },
        ink: {
          950: "#111318",
          900: "#1f242d",
          700: "#3b4351",
          500: "#697386"
        },
        signal: {
          amber: "#f59e0b",
          blue: "#2563eb",
          rose: "#e11d48",
          green: "#16a34a"
        }
      },
      boxShadow: {
        focus: "0 0 0 3px rgb(23 183 159 / 0.35)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"]
      }
    }
  },
  plugins: []
};

export default config;
