const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

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
            publicPath: "",
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
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                        "postcss-loader",
                    ],
                },
                {
                    test: /\.(png|svg|gif|jp?eg|webp)$/,
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "resources/images",
                        publicPath: "",
                    },
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery",
            }),
            new CopyPlugin({
                patterns: [
                    {
                        from: "./src/assets",
                        to: "resources/assets",
                    },
                    {
                        from: "./src/images",
                        to: "resources/images",
                    },
                ],
            }),
            new FaviconsWebpackPlugin({
                logo: "./src/favicon.png",
                cache: true,
                prefix: "resources/favicon/",
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: "./src/index.html",
            }),
            new MiniCssExtractPlugin({
                filename: "resources/css/[name].[contenthash].css",
            }),
        ],
        optimization: {
            minimize: true,
            minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
        },
    };
};
