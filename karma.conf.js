var path = require('path')
var webpack = require('webpack')
var postcssModulesValue = require('postcss-modules-values')
var autoprefixer = require('autoprefixer')
var postcssMixins = require('postcss-mixins')
var precss = require('precss')

module.exports = function (config) {
    config.set({
        browsers: ['Chrome'],
        // karma only needs to know about the test bundle
        files: [
            //'tests.webpack.js'
            'test/src/**/*.js'
            //'test/src/utils/attributeUtil.js'
        ],
        frameworks: ['mocha', 'chai-as-promised', 'sinon-chai'],
        plugins: [
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-sinon-chai',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-chai-as-promised'
        ],
        // run the bundle through the webpack and sourcemap plugins
        preprocessors: {
            //'tests.webpack.js': [ 'webpack', 'sourcemap' ]
            'src/**/*.js': ['webpack', 'sourcemap'],
            'test/src/**/*.js': ['webpack', 'sourcemap']
        },
        reporters: ['progress'], // values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        browserNoActivityTimeout: 30000,
        colors: true,
        logLevel: config.LOG_ERROR, // values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        client: { mocha: {timeout: 30000} }, // mocha timeout , defaults to 2000
        singleRun: true,
        // webpack config object
        webpack: {
            devtool: 'inline-source-map',
            resolve: {
                alias: {
                    styles: path.resolve(__dirname, 'styles'),
                    i18n: path.resolve(__dirname, 'src/i18n'),
                    img: path.resolve(__dirname, 'img'),
                    base: path.resolve(__dirname, 'src/components/base'),
                    utils: path.resolve(__dirname, 'src/utils'),
                    sinon: 'sinon/pkg/sinon.js'
                },
                modulesDirectories: [
                    'node_modules', 'common', 'img', 'test/peerDependencies/node_modules'
                ]
            },
            module: {
                noParse: [ /\/sinon\.js/ ],
                loaders: [
                    {
                        test: /\.js$/,
                        loaders: [ 'babel-loader' ],
                        include: [
                            path.join(__dirname, 'src'),
                            path.join(__dirname, 'test')
                        ]
                    },
                    {
                        test: /\.css$/,
                        exclude: [
                            path.resolve(__dirname, 'node_modules')
                        ],
                        include: [
                            path.resolve(__dirname, 'styles'),
                            path.resolve(__dirname, 'src/components/metal/styles')
                        ],
                        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
                    },
                    {
                        test: /\.json$/,
                        loaders: ['json']
                    },
                    {
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
            }
            , externals: {
                'cheerio': 'window',
                'react/lib/ReactContext': true,
                'react/lib/ExecutionEnvironment': true,
                'sinon': true
                //'react-dom': true,
                //'react-dom/server': true,
                //'react-addons-test-utils': true
            }
        },
        webpackMiddleware: {
            noInfo: true
        }
    });
};
