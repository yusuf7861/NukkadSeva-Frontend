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
                primary: {
                    50: "#e6f3ff",
                    100: "#b3daff",
                    200: "#80c1ff",
                    300: "#4da8ff",
                    400: "#1a8fff",
                    500: "#137fec",
                    600: "#0f66bd",
                    700: "#0b4d8e",
                    800: "#07335e",
                    900: "#031a2f",
                },
            },
            fontFamily: {
                sans: ["system-ui", "sans-serif"],
            },
        },
    },
    plugins: [],
};

export default config;
