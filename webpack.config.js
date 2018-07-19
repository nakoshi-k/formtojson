const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');
module.exports = {
    mode: 'production',
    entry: {
        "pack/test" : __dirname + '/tests/test.ts',
        },
    output: {
      filename: '[name].min.js',
      path : __dirname + "/tests/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js" , ".styl" ],
        
        plugins: [new TsconfigPathsPlugin({
            configFile:  __dirname + "/tsconfig.json"
        }
        
        )], 
    },
    devtool : "hidden-source-map",
    module: {
        rules: [
            { 
              test: /\.tsx?$/,
              use : { 
                  loader: 'ts-loader' ,
                  options : {
                       transpileOnly : false
                    } 
                } 
        }
        ]
    },
    plugins : [
        new UglifyJsPlugin({
            sourceMap : false,
            uglifyOptions :{
                compress : {warnings: false}
            }
        }),
        new UnminifiedWebpackPlugin()
    ]
  };