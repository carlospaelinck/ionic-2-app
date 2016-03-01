var path = require('path')

module.exports = {
    devtool: 'source-map',
    entry: [
        path.normalize('es6-shim/es6-shim.min'),
        'reflect-metadata',
        path.normalize('zone.js/dist/zone-microtask'),
        path.resolve('app/app')
    ],
    output: {
        path: path.resolve('www/build/js'),
        filename: 'app.bundle.js',
        pathinfo: false // show module paths in the bundle, handy for debugging
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
                    resolveGlobs: true
                },
                include: path.resolve('app'),
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
        root: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'app')
        ],
        alias: {
            'services' : 'services',
            'models' : 'models',
            'components' : 'components',
            'pages': 'pages'
        },
        extensions: ['', '.js', '.ts']
    }
}
