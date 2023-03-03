const { resolve } = require("path");
const ESlintPlugin = require("eslint-webpack-plugin");
const HtmlWebPackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: 'js/build.js',
        // 开发模式没有输出
        path: undefined,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
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
    ],
    devServer: {
        host: 'localhost',
        port: '3000',
        open: true
    },
    mode: "development",
};
