const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = [{
    entry: {
        'client': './src/client/index.js'
    },
    output: {
        libraryTarget: 'var',
        library: 'Client',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            excludeChunks: ['server']
        }),
        new MiniCssExtractPlugin({ filename: "[name].css" })
    ],
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin({}), new CssMinimizerPlugin()],
    }
},
{
    entry: {
        'server': './src/server/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'production',
    target: 'node',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
}]
