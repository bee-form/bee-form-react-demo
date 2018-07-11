import {RComponent} from "../common/r-component";
import {CodePanel} from "./code-panel/code-panel";

export class ExampleBox extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            data: null,
            initForm: false,
        };
    }

    render() {
        const {component, title, subTitle, index, description, codes} = this.props;
        const {data, initForm} = this.state;

        const ExampleComp = component;

        return (
            <div>
                <div className="page-header">
                    <h1>
                        Example {index}: {title}

                        {subTitle && (
                            <span> <small>({subTitle})</small></span>
                        )}
                    </h1>
                </div>

                {description && (
                    <div className="">
                        {description}
                    </div>
                )}

                <ExampleComp
                    ref={(formComp) => {
                        if (formComp && !initForm) {
                            formComp.form.onChange(() => {
                                this.setState({data: formComp.form.getData()});
                            });
                            return this.setState({data: formComp.form.getData(), initForm: true});
                        }
                    }}
                />

                <hr/>

                <CodePanel
                    data={data}
                    codes={codes.concat([
                        {name: "err-msg.jsx", code: require("!raw-loader!./common/err-msg.jsx")},
                    ])}
                />
            </div>
        );
    }
}