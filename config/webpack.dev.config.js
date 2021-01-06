const { merge } = require('webpack-merge');
const path = require('path');
const webpackBaseConfig = require('./webpack.common.config.js');

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../build')
    },
    devServer: {
        historyApiFallback: true,
        port: 7070,
        writeToDisk: true
    },
    devtool: 'eval-source-map'
});
