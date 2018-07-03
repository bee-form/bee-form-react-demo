import {RComponent} from "../../common/r-component";
import classnames from "classnames";
import {Tabs} from "./tabs";

export class CodePanel extends RComponent {
    render() {
        const {data, codes} = this.props;

        return (
            <div className="code-panel">
                <Tabs
                    tabs={[
                        {
                            title: "Form Data",
                            content: () => <pre>{data !== undefined ? JSON.stringify(data) : "undefined"}</pre>
                        },
                    ].concat(codes == null ? [] : codes.map((code) => {
                        if (typeof code == "string") {
                            return ({
                                title: "Source Code",
                                content: () => <pre>{code}</pre>,
                            });
                        }
                        return ({
                            title: code.name,
                            content: () => <pre>{code.code}</pre>,
                        });
                    }))}
                />
            </div>
        );
    }
}