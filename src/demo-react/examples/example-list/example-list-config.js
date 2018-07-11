import ExampleList from "./example-list";

module.exports = {
    title: "List of data",
    index: "3",
    component: ExampleList,
    codes: [
        require("!raw-loader!./example-list.jsx"),
        {name: "question-form.jsx", code: require("!raw-loader!./question-form.jsx")},
    ]
};
