'use strict';

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    watch: false,
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public', 'build', 'js')
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
                presets: ['env']
            }
        }, {
            test: /\.html$/,
            exclude: /node_modules/,
            loader: 'html-loader',
            options: {
                minimize: true
            }
        }]
    },
    devtool: 'source-map',
    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        })
    ]
};
