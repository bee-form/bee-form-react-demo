import {ExampleBinds} from "./example-binds";

module.exports = {
    title: "Ways to bind",
    index: "8",
    // subTitle: "Try code 'c1'",
    component: ExampleBinds,
    codes: [
        require("!raw-loader!./example-binds"),
    ]
};