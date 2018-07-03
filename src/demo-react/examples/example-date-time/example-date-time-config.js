import {ExampleDateTime} from "./example-date-time";

module.exports = {
    title: "Date and time combined",
    index: "6",
    component: ExampleDateTime,
    description: `This time we have 2 input fields but mapped to a single data entry`,
    codes: [
        require("!raw-loader!./example-date-time"),
    ],
};