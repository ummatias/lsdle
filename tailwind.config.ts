import type { Config } from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
            keyframes: {
                fadeInUp: {
                    "0%": { opacity: "0", transform: "translateY(12px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0", transform: "translateY(-6px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                flipIn: {
                    "0%": {
                        opacity: "0",
                        transform: "scale(0.85) translateY(4px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "scale(1) translateY(0)",
                    },
                },
            },
            animation: {
                fadeInUp: "fadeInUp 0.35s cubic-bezier(0.22,1,0.36,1) both",
                fadeIn: "fadeIn 0.2s ease-out both",
                flipIn: "flipIn 0.35s cubic-bezier(0.22,1,0.36,1) both",
            },
        },
    },
    plugins: [],
} satisfies Config;
