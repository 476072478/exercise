const { resolve } = require("path");
const ESlintPlugin = require("eslint-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: 'js/bulid.js',
        path: resolve(__dirname, "../dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|svg|)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 6 * 1024, //10kb
                    },
                },
                generator: {
                    //  输出图片名字
                    filename: "images/[hash:10][ext]",
                },
            },
            {
                test: /\.(ttf|woff2?|mp3|mp4|avi)$/,
                type: "asset/resource",
                generator: {
                    //  输出图片名字
                    filename: "font/[hash:10][ext]",
                },
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/, //排除
                loader: "babel-loader",
            },
        ],
    },
    plugins: [
        new ESlintPlugin({
            // 检测哪些
            context: resolve(__dirname, "../src"),
        }),
        new HtmlWebPackPlugin({
            template: resolve(__dirname, '../src/index.html')
        }),
        new MiniCssExtractPlugin({
            filename:'css/index.css'
        })
    ],
    mode: "production",
};
