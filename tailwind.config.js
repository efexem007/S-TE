/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'bg-light':      '#F8F9FB',
        'bg-cream':      '#F0F2F5',
        'bg-dark':       '#0B0C15',
        'bg-dark-2':     '#12121A',
        'bg-darkest':    '#050507',
        'accent-cyan':   '#00F0FF',
        'accent-violet': '#8B5CF6',
        'accent-rose':   '#F43F5E',
        'text-primary':  '#0A0A0F',
        'text-secondary':'#6B7280',
        'text-light':    '#F3F4F6',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero':    ['clamp(2.5rem, 6vw, 5.5rem)', { lineHeight: '1.05', fontWeight: '800', letterSpacing: '-0.03em' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)',   { lineHeight: '1.1',  fontWeight: '700', letterSpacing: '-0.02em' }],
      },
      backgroundImage: {
        'gradient-light-dark': 'linear-gradient(180deg, #F8F9FB 0%, #0B0C15 100%)',
        'gradient-dark-light': 'linear-gradient(180deg, #12121A 0%, #F8F9FB 100%)',
        'gradient-accent':     'linear-gradient(135deg, #00F0FF 0%, #8B5CF6 100%)',
        'gradient-mesh':       'radial-gradient(at 40% 20%, hsla(250,100%,70%,0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,0.15) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(340,100%,70%,0.15) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(280,100%,70%,0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(220,100%,70%,0.15) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-cyan':   '0 0 40px -10px rgba(0, 240, 255, 0.5)',
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.5)',
        'glow-rose':   '0 0 40px -10px rgba(244, 63, 94, 0.5)',
        'card':        '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover':  '0 12px 40px rgba(0,0,0,0.16)',
        'glass':       '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
      },
      animation: {
        'fade-up':    'fadeUp 0.8s ease forwards',
        'scale-in':   'scaleIn 1s ease forwards',
        'pulse-cyan': 'pulseCyan 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'float':      'float 6s ease-in-out infinite',
        'gradient-x': 'gradientX 6s ease infinite',
        'scroll-x':   'scrollX 30s linear infinite',
      },
      keyframes: {
        fadeUp:     { from: { opacity: '0', transform: 'translateY(40px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        scaleIn:    { from: { opacity: '0', transform: 'scale(0.95)' },      to: { opacity: '1', transform: 'scale(1)' } },
        pulseCyan:  { '0%,100%': { opacity: '1' }, '50%': { opacity: '.5' } },
        float:      { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
        gradientX:  { '0%,100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        scrollX:    { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
      },
    },
  },
  plugins: [],
};
