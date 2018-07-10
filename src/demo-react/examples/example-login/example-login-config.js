import ExampleLogin from "./example-login";

module.exports = {
    title: "Simple login",
    index: "1",
    component: ExampleLogin,
    codes: [
        require("!raw-loader!./example-login"),
    ],
};