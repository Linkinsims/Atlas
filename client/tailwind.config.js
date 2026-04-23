/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a0b0e",
        "bg-surface": "#111318",
        "bg-elevated": "#181b22",
        "bg-card": "#1e2028",
        "border-subtle": "rgba(255,255,255,0.05)",
        "border-default": "rgba(255,255,255,0.08)",
        "border-emphasis": "rgba(255,255,255,0.14)",
        "text-primary": "#ecedf0",
        "text-secondary": "#9097a6",
        "text-muted": "#555d6e",
        positive: "#3d9e6e",
        negative: "#c94f4f",
        warning: "#b87d3a",
        neutral: "#5a7db5",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        mono: ["DM Mono", "monospace"],
      },
      fontSize: {
        xs: ["11px", "1.4"],
        sm: ["12px", "1.4"],
        base: ["13px", "1.4"],
        lg: ["14px", "1.4"],
        xl: ["18px", "1.4"],
        "2xl": ["22px", "1.4"],
        "3xl": ["28px", "1.4"],
      },
      spacing: {
        18: "4.5rem",
      },
    },
  },
  plugins: [],
};
