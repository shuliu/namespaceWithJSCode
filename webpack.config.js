
"use strict";
/* jshint node: true */

const webpack = require('webpack');
const Path = require('path');
const outputPath = 'javascripts/';

module.exports = {
    entry: [
        'babel-polyfill',
        './javascripts/app/Test.js'
    ],
    output: {
        // publicPath: './javascripts/bundle/',
        path: Path.resolve(__dirname, 'javascripts/bundle/'),
        filename: 'all.build.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-1']
            }
        }]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: Path.join(__dirname, ''),
        compress: true,
        port: 9000
    }
};