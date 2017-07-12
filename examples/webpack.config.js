var path = require('path')
var webpack = require('webpack')
var postcssModulesValue = require('postcss-modules-values')
var autoprefixer = require('autoprefixer')
var postcssMixins = require('postcss-mixins')
var precss = require('precss')

module.exports = {
    devtool: 'source-map',
    entry: './index',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('debug'),
                __DEV__: false
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
                include: [
                    path.join(__dirname, './index.js')
                ]
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
                include: [
                    path.resolve(__dirname, 'node_modules')
                ]
            },
            {
                test: /\.css$/,
                exclude: [
                    path.resolve(__dirname, 'node_modules')
                ],
                include: [
                    path.resolve(__dirname, './')
                ],
                loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
            },
            {
                test: /\.json$/,
                include: [
                    path.resolve(__dirname, './')
                ],
                loaders: ['json']
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|cur)$/,
                loaders: ['url-loader']
            }
        ]
    },
    postcss: function () {
        return [
            precss,
            postcssModulesValue,
            postcssMixins,
            autoprefixer({browsers: ['> 5%', 'ie 9']})
        ]
    }
}
