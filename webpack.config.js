var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var fs = require('fs')
var postcssModulesValue = require('postcss-modules-values')
var autoprefixer = require('autoprefixer')
var postcssMixins = require('postcss-mixins')
var precss = require('precss')

var replaceThis ='<div id="root"></div>'
var withThis ='<div id="root"></div>' +
    //'<script src="/static/vendors.bundle.js"></script>'+
    '<script src="/static/bundle.js"></script>'

var cnt = fs.readFileSync('index-template.html')
fs.writeFileSync('index.html', cnt.toString().replace(replaceThis, withThis).replace(/\<title.*title\>/, '<title>formtastic</title>'))

module.exports = {
    devtool: 'source-map',
    entry: {
        app: [
            'webpack-dev-server/client?http://localhost:3030',
            'webpack/hot/only-dev-server',
            './examples/src/index'
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            '__DEV__': false
        })
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
            img: path.resolve(__dirname, 'statics/img')
        },
        modulesDirectories: [
            //'node_modules', 'common', 'img', './examples/node_modules'
        ]
    },
    module: {
        loaders: [ {
            test: /\.js$/,
            loaders: [ 'react-hot', 'babel-loader', 'eslint-loader' ],
            include: [
                path.join(__dirname, 'src'),
                path.join(__dirname, 'examples/src')
            ]
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, 'src/styles')
            ]
        },
        {
            test: /\.json$/,
            include: [
                path.resolve(__dirname, 'src'),
                path.resolve(__dirname, 'node_modules')
            ],
            loader: 'json-loader'
        }, {
            test: /\.(svg|png|jpg|jpeg|gif|ico|cur|eot|woff|ttf)$/,
            loaders: [ 'url-loader' ]
        }, {
            test: /\.eot/,
            loader : 'file?prefix=font/'
        }, {
            test: /\.woff/,
            loader : 'file?prefix=font/&limit=10000&mimetype=application/font-woff'
        }, {
            test: /\.ttf/,
            loader : 'file?prefix=font/'
        }, {
            test: /\.svg/,
            loader : 'file?prefix=font/'
        } ]
    },
    node: {
        fs: 'empty'
    },
    postcss: function () {
        return [
            precss,
            postcssModulesValue,
            postcssMixins,
            autoprefixer({ browsers: [ '> 5%', 'ie 9' ] })
        ]
    },
    externals: {
        CONFIG: 'CONFIG'
    }
}
