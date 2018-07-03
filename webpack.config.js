
module.exports = {
    cache: true,
    // devtool: "eval",
    entry: "./src/demo-react/demo-loader.jsx",
    output: {
        path: `${__dirname}/dist/js`,
        filename: "rlf-demo.js"
    },
    performance: {
        hints: false, // enum
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: (input) => {
                    return input.indexOf("node_module") > -1 || input.indexOf("bee-form/") > -1;
                },
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    presets: ['env', 'stage-0', "react"],
                }

            },
        ],
    },
    resolve: {
        // root: __dirname + "/src/js",
        extensions: ['.js', '.jsx']
    },
};

