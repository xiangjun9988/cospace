var path = require('path'); //根路径
var webpack = require('webpack'); //webpack模块
var HtmlWebpackPlugin = require('html-webpack-plugin'); //webpack html 打包模块
var ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require('./src/config');

var basepath = __dirname + '/'; //源码路径
var node_modules = path.resolve(__dirname, 'node_modules'); //node包模块

var webpackConfig = {
    entry: {
        "index": path.resolve(__dirname, "src/app.js"), //入口文件
        "common": ['vue', 'vue-router'], //vue全家桶公共引入
        "polyfill": ['babel-polyfill'], //补全es6原生对象
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: '[name].js',  //文件名规则 [name]表示 和 入口一致
        publicPath: ''
    },
    module: {
        loaders: [{ //对大于6000字节 的图片采取base64处理
            test: /\.(png|jpg|gif)$/,
            loader: 'url?limit=6000'
        }, {
            test: /\.css$/, //css 加载器
            loader: 'style!css?sourceMap'
        }, {
            test: /\.js$/, //js 加载器
            loader: 'babel',
            exclude: /node_modules|vue\/dist|vue-router\/|vue-loader\/|vue-hot-reload-api\//,
        }, {
            test: /\.vue$/, //vue 模板加载器
            loader: 'vue'
        }, {
            test: /\.scss$/,
            loaders: ['style','css', 'sass']
        }, {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            loader: 'url-loader?limit=1&name=fonts/[name].[ext]'
        }]
    },
    babel: {
        presets: ['es2015'],
        plugins: ['transform-runtime']
    },
    resolve: {
        //配置别名，在项目中可缩减引用路径
        alias: {
            'vue$': 'vue/dist/vue.js',
            "jquery": 'jquery/dist/jquery.min.js',
            'util' : __dirname + '/src/common/util.js',
            'pagination' : __dirname + '/src/libs/pagination/mricode.pagination.js',
            'editableselect' : __dirname + '/src/bootstrap/js/jquery-editable-select.js',
        }
    },
    plugins: [
        //提供全局的变量，在模块中使用无需用require引入
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            Vue: 'vue',
            util: 'util'
        }),
        //将公共代码抽离出来合并为一个文件
        new webpack.optimize.CommonsChunkPlugin({
            name: ['common'],
            minChunks: Infinity
        }),
        //提取css
        //new ExtractTextPlugin("styles.css"),

        //根据模板插入css/js等生成最终HTML
        new HtmlWebpackPlugin({
            //favicon路径                     
            //favicon:'src/favicon.ico', 
            //需要修改入口js的文件地址
            filename: path.resolve(__dirname, 'build/index.html'),
            //修改的模板
            template: path.resolve(__dirname, 'src/index.html'),
            //允许插件修改哪些内容，包括head与body
            inject: true,
            //为静态资源生成hash值
            //hash:true,
            //压缩HTML文件
            minify: {
                //移除HTML中的注释
                removeComments: true,
                //删除空白符与换行符  
                collapseWhitespace: false
            }
        })
    ],
    devServer: {
        contentBase: './build',
        inline: true
        // proxy: {
        //     '/cospace2017': {
        //         target: 'http://192.168.0.15:8881',
        //         changeOrigin: true,
        //         secure: false
        //     } 
        // }

        // proxy: {
        //     '/cospace2017': {
        //         target: 'http://192.168.2.69:8080',
        //         changeOrigin: true,
        //         secure: false
        //     } 
        // }

    }
};

module.exports = webpackConfig;