module.exports = {
  mode: 'jit',
  content: [
    'app/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'class',
    }),
   ],
};