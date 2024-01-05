const path = require('path')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
 template: "./src/index.html",
 filename: "./index.html"
});

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                exclude: /node_modules/,
                use:{
                    loader: "ts-loader"
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    
    plugins: [htmlPlugin],
    
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
      },
};