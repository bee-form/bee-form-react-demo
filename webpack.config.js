
module.exports = {
    cache: true,
    // devtool: "eval",
    entry: "./src/demo-react/demo-loader.jsx",
    output: {
        path: `${__dirname}/dist/js`,
        filename: "bee-form-demo.js"
    },
    performance: {
        hints: false, // enum
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: (input) => {
                    if (input.indexOf("node_modules/") > -1) {
                        return true;
                    }
                    if (input.indexOf("bee-form-react-demo/") > -1) {
                        return false;
                    }
                    return input.indexOf("bee-form/") > -1 || input.indexOf("bee-form-react/") > -1;
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

