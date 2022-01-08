const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    entry: {
        index: './src/index.js',
        hot: 'webpack/hot/dev-server.js',
        client: 'webpack-dev-server/client/index.js?hot=true&live-reload=true'
    },
    devtool: 'inline-source-map',
    devServer: {
        static: "./dist",
        hot: true,
        client: false
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Restaurant',
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [{
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(json)$/i,
                type: 'asset/resource'
            }
        ],
    },
    optimization: {
        runtimeChunk: 'single',
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
};