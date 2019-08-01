const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const babel = require('@babel/core')

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, 'dist')
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: '**/*.wxml',
        to: './'
      },
      {
        from: '**/*.json',
        to: './'
      },
      {
        from: '**/*.jpg',
        to: './'
      },
      {
        from: '**/*.png',
        to: './'
      },
      {
        from: '**/*.css',
        to: './'
      },
      {
        from: '**/*.js',
        ignore: ['*.test.js', '*.spec.js'],
        to: './',
        transform(content, path) {
          const newCode = babel.transformSync(content, {
            babelrc: true,
            "presets": ["@babel/env"]
          }).code;
          return Promise.resolve(newCode.toString());
        },
      },
    ],{
      context: './src'
    })
  ]
}
