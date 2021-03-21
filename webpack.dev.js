const path = require('path')
const webpack = require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin")
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

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
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 8082,
        injectClient: false
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html",
            excludeChunks: ['server']
        }),
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
},
{
    entry: {
        'server': './src/server/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    mode: 'development',
    devtool: 'source-map',
    stats: 'verbose',
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