var webpack = require('webpack')
var WebpackDevServer = require('webpack-dev-server')
var args = process.argv.splice(2)
var dev = false
for(var i=0;i<args.length;i++) {
    if(args[i] == 'dev') {
        dev = true
    }
}
var port = dev ? 3031 : 8080
var config = dev ? require('./webpack.config.dev') : require('./webpack.config')

new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    historyApiFallback: true
}).listen(port, '0.0.0.0', function (err, result) {
    if (err) {
        console.log(err)
    }

    console.log('Listening at localhost:' + port)
})
