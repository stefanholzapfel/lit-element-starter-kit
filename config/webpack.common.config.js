const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const dotenv = require('dotenv');
const webpack = require('webpack');

const getEnvVars = () => {
    // call dotenv and it will return an Object with a parsed key
    const env = dotenv.config().parsed;

    // reduce it to a nice object, the same as before
    return Object.keys(env).reduce((prev, next) => {
        prev[next] = JSON.stringify(env[next]);
        return prev;
    }, {});
};


module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[chunkhash].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'assets': path.resolve('src/assets')
        }
    },
    devServer: {
        historyApiFallback: true,
        port: 7070
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', {targets: {ie: '11'}}]
                        ],
                        include: [
                            // These packages are distributed as es2015 modules, therefore they need
                            // to be transpiled to es5.
                            /node_modules(?:\/|\\)lit-element|lit-html/
                        ],
                        plugins: [
                            ['@babel/plugin-syntax-dynamic-import'],
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader'
                }
            },
            {
                test: [/.css$|.scss$/],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SP_ENV_VARS': getEnvVars()
        }),
        new CopyWebpackPlugin([
            {
                from: './src/assets',
                to: 'assets'
            },
            'node_modules/@webcomponents/webcomponentsjs/*.js',
            'manifest.json'
        ]),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        }),
        new WorkboxWebpackPlugin.GenerateSW({
            include: [/\.html$/, /\.json$/, /\.js$/, /\.png$/, /\.jpg$/, /\.jpeg$/, /\.json$/, /\.css$/, /\.ttf$/, /\.woff$/, /\.ico$/, /\.svg$/],
            exclude: [/^node_modules\/@webcomponents\/webcomponentsjs\//],
            navigateFallback: 'index.html',
            swDest: 'service-worker.js',
            clientsClaim: true,
            skipWaiting: true
        }),
        new CleanWebpackPlugin()
    ]
};
