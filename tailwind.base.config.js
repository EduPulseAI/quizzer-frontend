/**
 * const baseConfig = require("../../tailwind.base.config");
 *
 * presets: [baseConfig],
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
        "./features/**/src/components/**/*.{ts,tsx,js,jsx,mdx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};
