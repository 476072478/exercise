const path = require('path')
const html = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js',
        environment: {
            arrowFunction: false  // 告诉webpack不适用箭头
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    //配置babel
                    {
                        //指定加载器
                        loader: 'babel-loader',
                        //配置babel,
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    //配置信息
                                    {
                                        //要兼容的浏览器
                                        targets: {
                                            "chrome": "88",
                                        },
                                        //指定corejs版本
                                        "corejs": "3",
                                        //使用corejs方式
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader',
                ],
                exclude: /node_modules/
            },
            //设置less文件处理
            {
                test: /\.less/,
                use: [
                    'style-loader',
                    'css-loader',
                    //引入postcss
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: 'last 2 versions'
                                        }]
                                ]
                            }
                        }
                    },
                    'less-loader'
                ]
            }
        ]
    },
    mode: 'development',
    //配置webpack插件,
    plugins: [
        new CleanWebpackPlugin(),
        new html({
            template: './src/index.html'
        })
    ]
}