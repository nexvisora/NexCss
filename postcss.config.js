module.exports = {
  plugins: [
    require('autoprefixer'),
    require('./dist/postcss.js')({
      // Your NexCSS configuration here
      theme: {
        // Override default theme settings
      },
      variants: {
        // Override default variants
      }
    })
  ]
};
