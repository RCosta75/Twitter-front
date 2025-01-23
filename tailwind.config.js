/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "custom-bar": "#243042",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".no-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".thin-scrollbar::-webkit-scrollbar": {
          width: "4px",
        },
        ".thin-scrollbar::-webkit-scrollbar-thumb": {
          backgroundColor: "#243042",
          borderRadius: "4px",
          cursor: "grab",
        },
        ".thin-scrollbar": {
          "scrollbar-width": "thin",
          "scrollbar-color": "#243042 transparent",
        },
      };
      addUtilities(newUtilities);
    },
    require("tailwindcss-motion"),
  ],
};
