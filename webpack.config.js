const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const TerserPlugin = require("terser-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const path = require("path");

module.exports = (env) => {
    // use to check environment
    const prod = env.production;

    return {
        entry: {
            // TODO
            common: "./src/js/common.js",
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
                    test: /\.css$/i,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: { publicPath: "" },
                        },
                        { loader: "css-loader" },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "resources/fonts/[name].[ext]",
                        },
                    },
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
                prefix: "resources/fonts/",
            }),
            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
                filename: prod
                    ? "resources/css/[name].[contenthash].css"
                    : "resources/css/[name].css",
                chunkFilename: "[id].css",
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
