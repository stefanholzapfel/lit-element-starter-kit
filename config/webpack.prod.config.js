const { merge } = require('webpack-merge');
const path = require('path');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new BundleAnalyzerPlugin()
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new OptimizeCSSAssetsPlugin(),
            new TerserPlugin({
                terserOptions: {

                }
            })
        ]
    }
});
