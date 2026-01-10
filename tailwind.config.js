/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'class', // Enable class-based dark mode
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-dark': '#0F172A',
            },
            borderRadius: {
                'card': '1.5rem', // 24px, equivalent to rounded-3xl
            },
        },
    },
    plugins: [],
}
