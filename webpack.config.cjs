const path = require('path')

module.exports = {
  entry: './src/module/main/MyChart.js', // Adjust if your entry file is located elsewhere.
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'graphifyjs.js',
    library: 'graphifyjs',
    libraryTarget: 'umd',
    globalObject: 'this',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}
