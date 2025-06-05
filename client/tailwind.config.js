/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366f1", // Primary indigo
          //600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6", // Secondary purple
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        accent: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899", // Accent pink
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
        },
        dark: {
          100: "#222222",
          200: "#1a1a1a",
          300: "#111111",
          400: "#0a0a0a",
          500: "#050505",
        },
      },
      boxShadow: {
        glow: "0 0 20px rgba(99, 102, 241, 0.3)",
        "glow-strong": "0 0 30px rgba(99, 102, 241, 0.5)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "border-flow": "border-flow 4s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 10px rgba(99, 102, 241, 0.3)" },
          "50%": { boxShadow: "0 0 25px rgba(99, 102, 241, 0.6)" },
        },
        "border-flow": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "300% 0%" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
