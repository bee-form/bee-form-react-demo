const {createForm, basicValidators: {required}} = require("bee-form-react");

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

                <p className="">
                    The Bee Form is built around very simple concepts, making it easy to understand and use.
                </p>

                <p className="">
                    For example, the form view in many methods ("scope", "withControl"), will return a version of itself,
                    only scoped down, or the "map" method will create a form view for each item in the mapped array data.
                </p>

                <p className="">
                    Here are different ways to bind an input
                </p>

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

                <p>
                    Please also remember that there is no 2-ways binding here, this is not Angular 1, `bind` is simply
                    a syntactic sugar to avoid multiple method calls. Also, every single state change in Bee Form is
                    based on immutability.
                </p>
            </div>
        );
    }
}