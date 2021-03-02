const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const PurgeCSSPlugin = require("purgecss-webpack-plugin");
const glob = require("glob");
const PATHS = {
    src: path.join(__dirname, "src"),
};

module.exports = (env) => {
    const prod = env.production;

    return {
        entry: {
            index: "./src/js/index.js",
        },
        output: {
            filename: prod
                ? "resources/js/[name].[contenthash].js"
                : "resources/js/[name].js",
            path: path.join(__dirname, "build"),
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [path.join(__dirname, "node_modules")],
                    use: ["babel-loader"],
                },
                {
                    test: /\.css$/i,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        { loader: "css-loader" },
                        { loader: "postcss-loader" },
                    ],
                },
                {
                    test: /\.(png|svg|jpg|jpeg|webp|gif)$/i,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "resources/images/[name].[ext]",
                        },
                    },
                },
            ],
        },
        plugins: [
            // TODO
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
                chunks: ["common", "index"],
            }),
            new FaviconsWebpackPlugin({
                logo: "./src/favicon.png",
                cache: true,
                prefix: "resources/favicon/",
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: prod
                    ? "resources/css/[name].[contenthash].css"
                    : "resources/css/[name].css",
                chunkFilename: "[id].css",
            }),
            new PurgeCSSPlugin({
                paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
            }),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
            }),
        ],
        optimization: {
            minimizer: [
                new CssMinimizerPlugin(),
                new TerserPlugin({
                    parallel: true,
                    terserOptions: {
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    },
                }),
            ],
        },
    };
};
