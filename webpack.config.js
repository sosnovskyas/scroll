const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const __PRODUCTION__ = process.env.NODE_ENV === "production";

const paths = {
  src: path.resolve(__dirname, "src"),
  dist: path.resolve(__dirname, "dist")
};

//noinspection JSUnresolvedVariable
module.exports = {
  entry: path.join(paths.src, "index.tsx"),
  output: {
    path: paths.dist,
    filename: __PRODUCTION__ ? "[name].[chunkhash].js" : "[name].js",
    chunkFilename: __PRODUCTION__ ? "[name].[chunkhash].js" : "[name].js"
  },
  devtool: __PRODUCTION__ ? false : "source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: path.join(__dirname, "node_modules")
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"]
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      name: true,
      cacheGroups: {
        commons: {
          name: "commons",
          chunks: "initial",
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.join(paths.src, "index.html"),
      filename: "index.html"
    })
  ],
  devServer: {
    historyApiFallback: true,
    inline: false,
    contentBase: paths.dist
  }
};
