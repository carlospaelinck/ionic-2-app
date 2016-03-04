const path = require('path');
const webpack = require('webpack');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
        filename: 'vendor.bundle.js'
    }),
    new webpack.optimize.DedupePlugin()
];

if (isProd) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        },
        sourceMap: true,
        minimize: false,
        comments: true,
        mangle: false
    }));
}

module.exports = {
    devtool: isProd ? undefined : 'source-map',
    entry: {
        js: path.resolve(__dirname, 'app/app.ts'),
        vendor: [
            path.normalize('es6-shim/es6-shim.min'),
            'reflect-metadata',
            path.normalize('zone.js/dist/zone-microtask'),
            'firebase',
            'ionic-angular'
        ]
    },
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false
    },
    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint'
        }],
        loaders: [{
            test: /\.ts$/,
            loader: 'awesome-typescript',
            query: {
                doTypeCheck: false,
                resolveGlobs: false
            },
            include: [path.resolve(__dirname, 'app')],
            exclude: /node_modules/
        }, {
            test: /\.js$/,
            include: path.resolve('node_modules/angular2'),
            loader: 'strip-sourcemap'
        }, {
            test: /\.html$/,
            loader: 'html'
        }, {
            test: /\.json/,
            loader: 'json'
        }, {
            test: /\.scss$/,
            loaders: [ 'style', 'css', 'sass' ]
        }, {
            test: /.*\.(gif|png|jpg|jpeg)$/i,
            loaders: [
                'file?hash=sha512&digest=hex&name=[hash].[ext]',
                'image-webpack?{progressive:true, optimizationLevel: 1, interlaced: false, pngquant:{quality: "65-90", speed: 10}}'
            ]
        }],
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
        extensions: ['', '.js', '.ts'],
        modules: [
            path.resolve(__dirname, 'app'),
            'node_modules'
        ],
        alias: {
            pages: path.resolve(__dirname, 'app/pages'),
            services: path.resolve(__dirname, 'app/services'),
            components: path.resolve(__dirname, 'app/components'),
            models: path.resolve(__dirname, 'app/models'),
            data: path.resolve(__dirname, 'app/data'),
            assets: path.resolve(__dirname, 'app/assets')
        }
    },
    plugins
};
