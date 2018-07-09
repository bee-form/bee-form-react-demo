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

    cmd("node ./node_modules/webpack-cli/bin/cli --watch --mode development");
    // if (!/^win/.test(process.platform)) { // linux
    //     spawn("node ./node_modules/webpack-cli/bin/webpack", ["--watch", "--mode", "development"], {stdio: "inherit"});
    // } else {
    //     spawn('cmd', ['/s', "/c", "webpack", "--watch", "--mode", "development"], {stdio: "inherit"});
    // }
});


function cmd(cmd, options = {
  stdio: "inherit",
  // stdio: "ignore"
}) {

  return new Promise((resolve, reject) => {
    let split = cmd.split(" ");

    const spawnOptions = !/^win/.test(process.platform) ? [split[0], split.slice(1), options] : ['cmd', ['/s', "/c", ...split], options];

    let p = spawn(...spawnOptions);
    p.on("close", (a, b) => {
      // console.log(a, b)
      resolve();
    });
  });
}

gulp.task("dev", ["build:watch"], () => {
    require("./src/run-server");
});

gulp.task("deploy", [], () => {
    Deploy.doDeploy();
});
