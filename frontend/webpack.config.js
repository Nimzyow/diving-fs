const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { SourceMapDevToolPlugin } = require("webpack")

module.exports = {
    entry: {
        app: [path.join(__dirname, "src", "index.tsx")],
    },
    optimization: {
        emitOnErrors: true,
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: "index.bundle.js",
        sourceMapFilename: "[name].js.map",
        publicPath: "/",
    },
    mode: process.env.NODE_ENV || "development",
    devtool: "inline-source-map",
    resolve: {
        modules: [path.resolve(__dirname, "src"), "node_modules"],
        extensions: [".webpack.js", ".web.js", ".jsx", ".js", ".json", ".tsx", ".ts"],
    },
    devServer: {
        // contentBase: path.join(__dirname, "src"),
        host: "0.0.0.0",
        port: 3000,
        hot: true,
        historyApiFallback: true,
        // disableHostCheck: true,
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|scss)$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg|JPG)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "index.html"),
        }),
        new SourceMapDevToolPlugin({
            filename: "[file].map",
        }),
    ],
}
