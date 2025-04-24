module.exports = {
  plugins: [
    require('autoprefixer'),
    require('../../dist/postcss.js')({
      theme: {
        colors: {
          primary: '#3490dc',
          secondary: '#ffed4a',
          danger: '#e3342f'
        }
      }
    })
  ]
};
