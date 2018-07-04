const {createForm, basicValidators: {required, equals}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleBinds extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            name: [ required],
        }, {
            name: "Sample Name",
        });

        this.form.onChange(() => this.forceUpdate());
    }

    render() {

        let fv = this.form.createView();

        return (
            <div className="form">

                <div className="">
                    The Bee Form is built around very simple concepts, making it easy to understand and use.
                </div>

                <div className="">
                    For example, the form view in many methods (`scope`, `withControl`), will return a version of itself,
                    only scoped down. The `map` method will provide a form view for each item in the mapped array data.
                </div>

                <div className="">
                    Here are different ways to bind an input
                </div>

                <div className="form-group">
                    <label className="control-label">Simple bind</label>
                    <input
                        {...fv.bind("name")}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">Scoped bind</label>
                    <input
                        {...fv.scope("name").bind()}
                        className="form-control"
                    />
                </div>

                <div className="form-group">
                    <label className="control-label">With control bind</label>
                    {fv.withControl("name", ({bind}) => ( // this also created a scoped down form view, and `bind` function
                        // here is de-structured from that form view
                        <input
                            {...bind()}
                            className="form-control"
                        />
                    ))}
                </div>

                <div className="form-group">
                    <label className="control-label">2 calls bind</label>
                        <input
                            value={fv.getValue("name") || ""}
                            onChange={(e) => fv.pushValue("name", e.target.value)}
                            className="form-control"
                        />
                </div>
            </div>
        );
    }
}