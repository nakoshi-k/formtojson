const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require("path");

const config = {
    mode: 'development',
    entry: {
        "app" : __dirname + '/src/index.ts',
        },
    output: {
      filename: 'light-form.min.js',
      path : path.resolve(__dirname + "/dist/"),
      library: 'LightForm',
      libraryTarget: 'window',
      libraryExport : "default"
    },
    optimization: {
        splitChunks: {
          name: 'vendor',
          chunks: 'initial',
        }
    },
    resolve: {
        extensions: [".ts"],
        plugins: [new TsconfigPathsPlugin({
            configFile:  __dirname + "/tsconfig.json"
        }
        )], 
    },
    devtool : "hidden-source-map",
    module: {
        rules: [
            { 
              test: /\.ts?$/,
              use : { 
                  loader: 'ts-loader',
                  options : {
                       transpileOnly : false
                    } 
                } 
            }
        ]
    }
  };

const mode = (process.argv.find(arg => arg.slice(0,6) === "--mode") 
|| "").replace("--mode=","") || config.mode

const min = (mode === "production") ? ".min" : "";

config.output.filename = `light-form${min}.js`

module.exports = config
