var path = require('path')
var webpack = require('webpack')
var postcssModulesValue = require('postcss-modules-values')
var autoprefixer = require('autoprefixer')
var postcssMixins = require('postcss-mixins')
var precss = require('precss')

module.exports = {
    devtool: 'source-map',
    entry: [
        'webpack-dev-server/client?http://localhost:3031',
        'webpack/hot/only-dev-server',
        './index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('debug'),
                __DEV__: true
            }
        })
        // new BundleAnalyzerPlugin()
    ],
    resolve: {
        alias: { // 给外层用, 只有 __DEV__ 下有用
            styles: path.resolve(__dirname, '../src/styles'),
            img: path.resolve(__dirname, '../statics/img'),
            'rc-calendar-extend': path.resolve(__dirname, '../src/index')
        },
        fallback: [
            path.resolve(__dirname, 'node_modules'),
            path.resolve(__dirname, '../node_modules')
        ]
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: [ 'react-hot','babel-loader'],
            include: [
                path.join(__dirname, './index.js'),
                path.join(__dirname, 'src'),
                path.join(__dirname, '../src')
            ]
        },
        {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
            include: [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, '../node_modules'),
                path.resolve(__dirname, '../src/styles')
            ]
        },
        {
            test: /\.json$/,
            include: [
                path.resolve(__dirname, '../src'),
                path.resolve(__dirname, '../node_modules'),
                path.resolve(__dirname, 'node_modules')
            ],
            loaders: ['json']
        }, {
            test: /\.(png|jpg|jpeg|gif|ico|cur)$/,
            loaders: [ 'url-loader' ]
        },
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
            autoprefixer({browsers: ['> 5%', 'ie 9']})
        ]
    },
    externals: {
        CONFIG: 'CONFIG'
    }
}
