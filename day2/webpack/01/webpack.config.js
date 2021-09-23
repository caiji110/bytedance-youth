const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./main.js",
    output: {
      filename: `myFirstWebpack[hash:8].js`,
      path: path.resolve(__dirname,'dist'),
      clean: true
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          // 从右向左，css-loader-》style-loader->webpack
          use: ['style-loader','css-loader']
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
    ],
    // 修改代码自动编译
    devServer: {
        static: './dist'
    }
  };