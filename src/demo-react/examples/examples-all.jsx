import {RComponent} from "../common/r-component";
import {ExampleBox} from "./example-box";

const examples = [
    require("./example-login/example-login-config"),
    require("./example-async/example-async-config"),
    require("./example-list/example-list-config"),
    require("./example-list-2/example-list-2-config"),
    require("./example-relative/example-relative-config"),
    require("./example-date/example-date-config"),
    require("./example-date-time/example-date-time-config"),
];

export class ExamplesAll extends RComponent {
    render() {

        return (
            <div className="container">
                {examples.map((ex, i) => (
                    <ExampleBox
                        key={i}
                        { ... ex }
                    />
                ))}
            </div>
        );
    }
}