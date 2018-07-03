import {ExampleDate} from "./example-date";

module.exports = {
    title: "Date string data type",
    index: "5",
    component: ExampleDate,
    description: `User type in date value, during typing, the value can not be parsed to date, so the input is 
    marked as invalid and form can not submit`,
    codes: [
        require("!raw-loader!./example-date"),
        {name: "tunnel-date-string.js", code: require("!raw-loader!./tunnel-date-string")},
    ],
};