const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
    entry: [
        'regenerator-runtime/runtime.js',
        './src/index.ts'
    ],
    output: {
        filename: '[name].[chunkhash].bundle.js',
        publicPath: '/'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            'assets': path.resolve('src/assets')
        }
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
                        exclude: [
                            'node_modules'
                        ]
                    }
                }
            },
            {
                test: /\.ts$/,
                use: {
                    loader: 'ts-loader',
                    options: {
                        allowTsInNodeModules: true
                    }
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
                test: /\.(svg|woff(2)?|ttf|eot|png|jpg|gif|ico|tif)(\?v=\d+\.\d+\.\d+)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: (url, resourcePath, context) => {
                            /* If a file is imported (e.g. in scss) and handled by this loader, save it to the same asset directory
                            in order to avoid duplicates from CopyWebpackPlugin */
                            return path.relative(context, resourcePath).slice(4).split('\\').join('/');
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.SP_ENV_VARS': getEnvVars()
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: './src/assets',
                    to: 'assets'
                },
                'node_modules/@webcomponents/webcomponentsjs/*.js',
                'manifest.json'
            ]
        }),
        new HtmlWebpackPlugin({
            chunksSortMode: 'none',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.[chunkhash].css'
        }),
        new WorkboxWebpackPlugin.InjectManifest({
            swSrc: './base-service-worker.js',
            swDest: 'service-worker.js'
        })
    ],
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 30,
            maxAsyncRequests: 30,
            maxSize: 100000
        }
    }
};
