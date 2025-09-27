const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.jsx'),
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: { publicPath: 'auto' },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [{ test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }, {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }] },
  plugins: [
    new ModuleFederationPlugin({
      name: 'base_app',
      filename: 'remoteEntry.js',
      remotes: {
        mfe_food: 'mfe_food@http://localhost:3001/remoteEntry.js',
        mfe_events: 'mfe_events@http://localhost:3002/remoteEntry.js',
        mfe_cab: 'mfe_cab@http://localhost:3003/remoteEntry.js',
        mfe_hotel: 'mfe_hotel@http://localhost:3004/remoteEntry.js'
      },
       exposes: {
    './CartSlice': './src/redux/cartSlice.js',
    './UserSlice': './src/redux/userSlice.js',
    './ReduxStore': './src/redux/store.js'
  },
      shared: { 
        react: { 
          singleton: true, 
          requiredVersion: false,
          eager: false  // Add this line
        }, 
        'react-dom': { 
          singleton: true, 
          requiredVersion: false,
          eager: false  // Add this line
        }, 
        'react-redux': { 
          singleton: true, 
          requiredVersion: false,
          eager: false  // Add this line
        }, 
        '@reduxjs/toolkit': { 
          singleton: true, 
          requiredVersion: false,
          eager: false  // Add this line
        } 
      }
    }),
    new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html') })
  ]
};