import {ExampleAsync} from "./example-async";

module.exports = {
    title: "Async validation",
    index: "2",
    subTitle: "Try code 'c1'",
    component: ExampleAsync,
    codes: [
        require("!raw-loader!./example-async"),
    ]

};