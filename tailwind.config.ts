import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F4F5F6",
        secondary: "#EDF6F7",
        accent: "#444F4F",
        "scrollbar-base": "transparent",
        "scrollbar-thumb": "transparent",
      },
      keyframes: {
        pulse1: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulse2: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulse3: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        pulse1: "pulse1 2s infinite",
        pulse2: "pulse2 2s 0.8s infinite",
        pulse3: "pulse3 2s 1.2s infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: Function }) {
      const newUtilities = {
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
        ".hide-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".blur-left": {
          "mask-image": "linear-gradient(to left, black 70%, transparent 100%)",
        },
        ".blur-right": {
          "mask-image":
            "linear-gradient(to right, black 70%, transparent 100%)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
