import ExampleList from "./example-list";

module.exports = {
    title: "List of data",
    index: "3",
    component: ExampleList,
    codes: [
        require("!raw-loader!./example-list.jsx"),
    ]
};

