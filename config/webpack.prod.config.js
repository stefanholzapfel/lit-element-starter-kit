const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpackBaseConfig = require('./webpack.common.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(webpackBaseConfig, {
    plugins: [
        new BundleAnalyzerPlugin(),
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all'
        },
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
