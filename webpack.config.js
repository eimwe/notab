const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  
  entry: {
    index: './src/scripts/index.js',
    slider: './src/scripts/slider.js',
  },
  
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024
          }
        },
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(png|jpe?g|webp)/i,
        type: 'asset/resource',
        generator: {
          filename: (name) => {
            const path = name.filename.split('/').slice(1, -1).join('/');
            return `${path}/[name][ext]`;
          },
        },
      },
      {
        test: /\.(le|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: ['postcss-preset-env'],
              },
            },
          },
          'less-loader',
        ],
      },
    ],
  },

  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          context: './src',
          from: './images',
          to: './images',
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'slider.html',
      template: './src/slider.html',
      chunks: ['slider'],
    }),
  ],

  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },

  devtool: 'source-map',
  
  devServer: {
    contentBase: './dist',
    hot: true,
  },
};