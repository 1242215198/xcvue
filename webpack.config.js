const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
    entry:'./src/main',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.vue$/,
                use:'vue-loader'
            },
            {
                test: /\.json$/,
                use: {
                    loader:'json-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'json/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'img/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'media/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: {
                    loader:'url-loader',
                    options: {
                        limit: 10000,
                        name: path.posix.join('static', 'fonts/[name].[hash:7].[ext]')
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["vue-style-loader", "css-loader"]
            },
            {
                test: /\.less$/,
                use: ["vue-style-loader", "css-loader", "less-loader"]
            }
            // {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader"]
            // },
            // {
            //     test: /\.less$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"]
            // }
            // {
            //     test: /\.css$/,
            //     use: ["css-loader"]
            // },
            // {
            //     test: /\.less$/,
            //     use: ["css-loader", "less-loader"]
            // }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue': 'vue/dist/vue.common.js',
            '@': __dirname + '/src',
        },
        symlinks: false
    },
    // optimization: {
    //     minimizer: [
    //         new UglifyJsPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //         new OptimizeCSSAssetsPlugin({})
    //     ]
    // },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebPackPlugin({
            template: "./index.html",
            filename: "index.html",
            inject:true,
            chunks:['main']
        }),
        // new ExtractTextPlugin({
        //     filename: 'static/css/[name].css',
        //     allChunks: true
        // })
        // new MiniCssExtractPlugin({
        //     filename: "[name].[chunkhash:8].css",
        //     chunkFilename: "[id].[chunkhash:8].css"
        // }),
        // new MiniCssExtractPlugin({
        //     filename: "[name].css",
        //     chunkFilename: "[id].css"
        // }),
        // new OptimizeCSSAssetsPlugin({
        //     assetNameRegExp: /\.optimize\.css$/g, // 正则表达式，指示应该优化\最小化的资产的名称。提供的正则表达式针对配置中ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/\.css$/g
        //     cssProcessor: require('cssnano'), // CSS处理器用于优化\最小化CSS，默认为cssnano。这应该是一个函数，它遵循cssnano.process接口（接收CSS和选项参数并返回一个Promise）。
        //     cssProcessorOptions: { discardComments: { removeAll: true } }, // 传递给cssProcessor的选项，默认为 {}
        //     canPrint: true // 指示插件是否可以将消息打印到控制台的布尔值，默认为 true
        // })
    ],
    devServer:{
        host:'localhost',
        port:1111,
        proxy:{
            '/upload':{
                target:'http://10.30.0.34:8080',
                pathRewrite:{'^/upload':'/'},
                changeOrigin: true,
                ws: true
            }
        }
    }
};