import ExampleRelative from "./example-relative";

module.exports = {
    title: "Validate with relative data reference",
    index: "4",
    component: ExampleRelative,
    description: `With this example, we have to check if the "confirm password" field is same with password`,
    codes: [
        require("!raw-loader!./example-relative"),
    ]
};