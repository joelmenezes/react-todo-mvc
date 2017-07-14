 var path = require('path');
 var webpack = require('webpack');
 
 var APP_DIR = path.resolve(__dirname, 'src/');

 module.exports = {
     entry: [
        'webpack-dev-server/client?http://127.0.0.1/8080/',
        APP_DIR + '/index.js'
    ],
     output: {
         path: path.resolve(__dirname, 'build'),
         filename: 'bundle.js'
     },
     module: {
         loaders: [
             {
                 test: /\.jsx?$/,
                 loader: 'babel-loader',
                 query: {
                     presets: ['es2015', 'react']
                 }
             },
             {
                 test: /\.css$/,
                 loader: 'style-loader!css-loader'
             }
         ]
     },
     stats: {
         colors: true
     },
     devtool: 'source-map'
 };