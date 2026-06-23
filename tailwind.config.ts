/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#04040f',
        'space-navy': '#0a0a1e',
        'space-deep': '#0d0d2b',
        'nebula-purple': '#6b21a8',
        'nebula-violet': '#7c3aed',
        'aurora-pink': '#ec4899',
        'aurora-rose': '#f43f5e',
        'star-white': '#f8fafc',
        'glow-blue': '#3b82f6',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'lora': ['Lora', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      animation: {
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'shooting-star': 'shootingStar 3s linear infinite',
        'typewriter': 'typewriter 4s steps(40, end)',
        'fade-in': 'fadeIn 1s ease-in-out',
        'heartbeat': 'heartbeat 1.5s ease-in-out infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px #ec4899, 0 0 20px #ec4899' },
          '50%': { boxShadow: '0 0 30px #ec4899, 0 0 60px #ec4899, 0 0 80px #f43f5e' },
        },
        shootingStar: {
          '0%': { transform: 'translateX(-100px) translateY(-100px)', opacity: '1' },
          '100%': { transform: 'translateX(300px) translateY(300px)', opacity: '0' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.2)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.1)' },
          '70%': { transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'star-gradient': 'radial-gradient(ellipse at center, #1a1a4e 0%, #0a0a1e 50%, #04040f 100%)',
        'aurora-gradient': 'linear-gradient(135deg, #6b21a8 0%, #ec4899 50%, #f43f5e 100%)',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
      },
    },
  },
  plugins: [],
};
