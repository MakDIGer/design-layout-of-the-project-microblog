const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/script.bundle.js',
        clean: true
    },
    mode: "development",
    // mode: "production",
    optimization: {
        minimize: false,
        minimizer: [new TerserPlugin({
            test: /\.js(\?.*)?$/i,
            parallel: 4,
            extractComments: false
        })]
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: { importLoaders: 1 },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer'
                                ]
                            }
                        }
                    },
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: {
                baseDir: ['dist']
            }
        }),
        new HtmlWebpackPlugin(
            {
                template: './src/index.html',
                filename: 'index.html'
            },
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/feedback.html',
                filename: 'feedback.html'
            },
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/admin.html',
                filename: 'admin.html'
            },
        ),
        new HtmlWebpackPlugin(
            {
                template: './src/login.html',
                filename: 'login.html'
            },
        ),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/img', to: 'img'},
                {from: 'src/css', to: 'css'},
                {from: 'src/js', to: 'js'}
            ]
        })
    ]
}