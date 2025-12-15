/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                wiki: {
                    bg: '#ffffff',
                    bgAlt: '#f8f9fa',
                    border: '#a2a9b1',
                    borderLight: '#c8ccd1',
                    text: '#202122',
                    textLight: '#54595d',
                    link: '#0645ad',
                    linkVisited: '#0b0080',
                    linkHover: '#0b0080',
                    sidebar: '#f6f6f6',
                }
            },
            fontFamily: {
                sans: ['Noto Sans JP', 'sans-serif'],
                serif: ['Noto Serif JP', 'serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
            },
        },
    },
    plugins: [],
}
