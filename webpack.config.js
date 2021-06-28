const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = process.env.NODE_ENV || 'development';

module.exports = {
  entry: ['./src/main.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  mode,
  devtool: mode === 'development' ? 'inline-source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [/node_modules/, /dist/],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      MockApi: path.resolve(__dirname, 'src', 'MockApi'),
    },
    extensions: ['.js', '.jsx', '.scss', '.css'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/template.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    port: 9000,
    hot: true,
    open: true,
    contentBase: path.join(__dirname, 'public'),
    contentBasePublicPath: '/public',
  },
  optimization: {
    splitChunks: {
      chunks: 'async',
    },
  },
};
