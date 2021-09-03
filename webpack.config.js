const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, options) => {

    const {mode = 'development'} = options;
    const isProd = mode === 'production';
    const isDev = mode === 'development';

    const getStyleLoaders = () => {
        return [
            isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader'
        ];
    };

    const getPlugins = () => {
        const plugins = [
            new HtmlWebpackPlugin({
                template: 'public/index.html'
            })
        ];

        if (isProd) {
            plugins.push(new MiniCssExtractPlugin({
                    filename: 'main-[fullhash:8].css'
                })
            );
        }

        return plugins;
    };

    return {
        mode: isProd ? 'production': isDev && 'development',

        output: {
            filename: isProd ? 'main-[fullhash:8].js' : undefined
        },

        devServer: {
            disableHostCheck: false
        },

        entry: isProd ? [] : [
            "webpack-dev-server/client?http://localhost:8081/",
            "webpack/hot/only-dev-server",
            "./src"
        ],

        module: {
            rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },

            // Loading images
            {
                test: /\.(png|jpg|jpeg|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                            name: '[name]-[sha1:fullhash:7].[ext]'
                        }
                    }
                ]
            },

            // Loading fonts
            {
                test: /\.(ttf|otf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'fonts',
                            name: '[name].[ext]'
                        }
                    }
                ]
            },

            // Loading CSS
            {
                test: /\.(css)$/,
                use: getStyleLoaders()
            },

            // Loading SASS/SCSS
            {
                test: /\.(s[ca]ss)$/,
                use: [...getStyleLoaders(), 'sass-loader']
            }

        ]
        },

        plugins: getPlugins(),

        devServer: {
            open: false,
            compress: true,
            hot: true,
        }
    };
};