const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: 'index.html',
    inject: 'body'
});

module.exports = {
    devtool: 'cheap-eval-source-map',
    entry: './src/index.js',
    resolve: {
      alias: {
        style: path.resolve(__dirname, 'src/sass/')
      }
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {

        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/ },
            {
                test: /\.scss$/,
                loaders: [ 'style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap' ]
            }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};
