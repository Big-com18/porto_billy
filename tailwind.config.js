/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1B1815",
        panel: "#23201C",
        panelLight: "#2B2722",
        rule: "#3A352E",
        paper: "#F2EDE4",
        muted: "#8C8579",
        amber: {
          DEFAULT: "#E8A33D",
          dim: "#B97F2C",
        },
        teal: {
          DEFAULT: "#6FA8A0",
          dim: "#4F7A74",
        },
        rose: "#C97064",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        grain: "url('/images/grain.svg')",
      },
    },
  },
  plugins: [],
};
