/**
 * Created by hjx on 10/26/2015.
 */
var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var postcssModulesValue = require('postcss-modules-values')
var autoprefixer = require('autoprefixer')
var postcssMixins = require('postcss-mixins')
var precss = require('precss')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    devtool: 'source-map',
    entry:  './src/index',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: './dist/',
        filename: 'index.js',
        library: '@sdp.nd/formtastic',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production'),
                __DEV__: true
            },
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn|en/)
        //new BundleAnalyzerPlugin()
    ],
    resolve: {
        alias: {
            styles: path.resolve(__dirname, 'src/styles'),
            img: path.resolve(__dirname, 'statics/img'),
            utils: path.resolve(__dirname, 'src/utils'),
            sinon: 'sinon/pkg/sinon.js'
        },
        modulesDirectories: [
            'node_modules', 'common', 'img'
        ]
    },
    module: {
        noParse: [ /\/sinon\.js/ ],
        loaders: [ {
            test: /\.js$/,
            loaders: [ 'babel-loader' ],
            include: path.join(__dirname, 'src')
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
            loaders: [ 'json' ]
        }, {
            test: /\.(png|jpg|jpeg|gif|ico|cur)$/,
            loaders: [ 'url-loader' ]
        },
        //{
        //    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        //    loader: 'file?name=./[hash].[ext]'
        //}
        { test: /\.svg(\?t=[0-9]+)?$/, loader: 'url?limit=65000&mimetype=image/svg+xml' },
        { test: /\.woff(\?t=[0-9]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff' },
        { test: /\.woff2(\?t=[0-9]+)?$/, loader: 'url?limit=65000&mimetype=application/font-woff2' },
        { test: /\.[ot]tf(\?t=[0-9]+)?$/, loader: 'url?limit=65000&mimetype=application/octet-stream' },
        { test: /\.eot(\?t=[0-9]+)?$/, loader: 'url?limit=65000&mimetype=application/vnd.ms-fontobject' }
        ]
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
        CONFIG: 'CONFIG',
        'react': {
            'commonjs': 'react',
            'commonjs2': 'react',
            'amd': 'react',
            'root': 'React'
        },
        'react-dom': {
            'commonjs': 'react-dom',
            'commonjs2': 'react-dom',
            'amd': 'react-dom',
            'root': 'ReactDOM'
        },
        'react-redux': {
            'commonjs': 'react-redux',
            'commonjs2': 'react-redux',
            'amd': 'react-redux'
        },
        'jquery': {
            'commonjs': 'jquery',
            'commonjs2': 'jquery',
            'amd': 'jquery',
            'root': 'jQuery'
        },
        'react-intl': {
            'commonjs': 'react-intl',
            'commonjs2': 'react-intl',
            'amd': 'react-intl'
        },
        'react-addons-update': {
            'commonjs': 'react-addons-update',
            'commonjs2': 'react-addons-update',
            'amd': 'react-addons-update'
        },
        'redux': {
            'commonjs': 'redux',
            'commonjs2': 'redux',
            'amd': 'redux'
        },
        'redux-saga': {
            'commonjs': 'redux-saga',
            'commonjs2': 'redux-saga',
            'amd': 'redux-saga'
        },
        'redux-saga/effects': {
            'commonjs': 'redux-saga/effects',
            'commonjs2': 'redux-saga/effects',
            'amd': 'redux-saga/effects'
        },
        'immutable': {
            'commonjs': 'immutable',
            'commonjs2': 'immutable',
            'amd': 'immutable'
        },
        'react-ace': {
            'commonjs': 'react-ace',
            'commonjs2': 'react-ace',
            'amd': 'react-ace'
        }
    }
}
