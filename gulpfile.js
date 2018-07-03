var gulp = require("gulp");
var spawn = require('child_process').spawn;
let {Deploy} = require("./src/build/deploy");

function createStylusCompiler() {
    return require("./src/build/stylus-compiler").createCompiler({
        container: {
            dir: `src/demo/assets/styl`,
            file: "style.styl",
        },
        lookupDirs: [
            `src/demo-react`
        ],
        distDir: `dist/css/demo`,
    });
}


const stylusCompiler = createStylusCompiler();

gulp.task("build:watch", () => {
    stylusCompiler.watch();

    if (!/^win/.test(process.platform)) { // linux
        spawn("webpack", ["--watch", "--mode", "development"], {stdio: "inherit"});
    } else {
        spawn('cmd', ['/s', "/c", "webpack", "--watch", "--mode", "development"], {stdio: "inherit"});
    }
});


gulp.task("dev", ["build:watch"], () => {
    require("./src/run-server");
});

gulp.task("deploy", [], () => {
    Deploy.doDeploy();
});
