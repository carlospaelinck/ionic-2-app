const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'source-map',
    entry: {
        js: path.join(__dirname, 'app/app.ts'),
        vendor: [
            path.normalize('es6-shim/es6-shim.min'),
            'reflect-metadata',
            path.normalize('zone.js/dist/zone-microtask'),
            'ionic-angular'
        ]
    },
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false
    },
    module: {
        preLoaders: [
            {
                test: /\.ts$/,
                loader: 'tslint'
            }
        ],
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript',
                query: {
                    doTypeCheck: false,
                    resolveGlobs: false
                },
                include: [ path.resolve(__dirname, 'app') ],
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                include: path.resolve('node_modules/angular2'),
                loader: 'strip-sourcemap'
            },
            {
                test: /\.html$/,
                loader: 'html'
            }
        ],
        noParse: [
            /es6-shim/,
            /reflect-metadata/,
            /zone\.js(\/|\\)dist(\/|\\)zone-microtask/
        ]
    },
    tslint: {
        emitErrors: true
    },
    resolve: {
        extensions: [ '', '.js', '.ts' ],
        modules: [
            path.join(__dirname, 'app'),
            'node_modules'
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.optimize.DedupePlugin()
/*
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            sourceMap: false,
            minimize: true,
            comments: false,
            mangle: false
        })
*/
    ]
};
