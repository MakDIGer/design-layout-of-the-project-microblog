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
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
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
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new MiniCssExtractPlugin({
            filename: 'css/style.css'
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: 'src/img', to: 'img'}
            ]
        })
    ]
}