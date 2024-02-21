const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: './src/js/main.js',
        searcher: './src/js/Searcher.js'
    },
    output: {
        filename: '[name].min.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /database\.json$/i,
                generator: {
                    filename: '[name][ext]'
                }
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'searcher.min.css',
        }),
        new CopyPlugin({
            patterns: [{
                from: path.resolve(__dirname, 'src/database.json'),
                to: path.resolve(__dirname, 'dist/database.json')
            }],
        }),
    ],
    performance: {
        maxAssetSize: 2 * 1024 * 1024, // 最大资产大小（例如，2 MiB）
        maxEntrypointSize: 3 * 1024 * 1024, // 最大入口点大小
        hints: "warning" // "error", "warning", 或 false (禁用)
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,  // 保留类名
                }
            })
        ]
    },
};