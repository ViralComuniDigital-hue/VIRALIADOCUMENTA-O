
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          black: '#050507',
          dark: '#08080a',
          blue: '#00f2ff',
          purple: '#bc13fe',
          pink: '#ff00ff',
          gray: '#151518'
        }
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      boxShadow: {
        'neon-blue': '0 0 15px rgba(0, 242, 255, 0.4), 0 0 30px rgba(0, 242, 255, 0.1)',
        'neon-purple': '0 0 15px rgba(188, 19, 254, 0.4), 0 0 30px rgba(188, 19, 254, 0.1)',
        'neon-pink': '0 0 15px rgba(255, 0, 255, 0.4), 0 0 30px rgba(255, 0, 255, 0.1)',
        'inner-blue': 'inset 0 0 10px rgba(0, 242, 255, 0.2)',
      },
      animation: {
        'scan': 'scan 4s linear infinite',
        'glitch': 'glitch 0.5s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'data-stream': 'data-stream 20s linear infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%', opacity: '0.1' },
          '50%': { opacity: '0.5' },
          '100%': { top: '100%', opacity: '0.1' }
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(-2px, -1px)' },
          '60%': { transform: 'translate(2px, 1px)' },
          '80%': { transform: 'translate(2px, -1px)' },
          '100%': { transform: 'translate(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(1deg)' }
        },
        'data-stream': {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-1000px)' }
        }
      }
    }
  },
  plugins: [],
}
