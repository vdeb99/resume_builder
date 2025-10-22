export default {
  plugins: {
    '@tailwindcss/postcss': {
      optimize: {
        minify: true,
      },
      // Force legacy color format
      config: {
        theme: {
          colors: 'legacy', // This forces RGB output
        },
      },
    },
  },
}