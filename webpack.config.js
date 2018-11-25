const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if(process.env.NODE_ENV === "test"){
require("dotenv").config({path: ".env.test"});
}else if (process.env.NODE_ENV === "development"){
  require("dotenv").config({path: ".env.development"});
}

module.exports = (env) => {
  const isProduction = env === "production";

  console.log("env", env);
  return {
    mode: "development",
    entry: "./src/index.js",
    output: {
      path: path.join(__dirname, "public"),
      filename: "bundle.js"
    },
    module: {
      rules: [{
        loader: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ],
        test: /\.s?css$/
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "react-svg-loader",
            options: {
              jsx: true
            }
          }
        ]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "styles.css",
        chunkFilename: "[id].css"
      }),
      new webpack.DefinePlugin({
        "process.env.DATABASE_URL": JSON.stringify(process.env.DATABASE_URL),
        "process.env.CONFIG_SECRET": JSON.stringify(process.env.CONFIG_SECRET),
        "process.env.STATUS_SECRET": JSON.stringify(process.env.STATUS_SECRET)
      })
    ],
    devtool: isProduction ? "source-map" : "inline-source-map",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      historyApiFallback: true
    }
  };
};