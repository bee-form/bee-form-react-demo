const {createForm, basicValidators: {required, equals}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleDebounce extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            promotion_code: {
                validators: [ required, equals("c1")],
                debounce: 1000,
            },
        });

        this.form.onChange(() => this.forceUpdate());
    }

    render() {

        let fv = this.form.createView();

        return (
            <div className="form">

                {/* access_code input */}
                {fv.withControl("promotion_code", ({isValid, bind, getError}) => (
                    <div
                        className={cln("form-group", {"has-error": !isValid()})}
                    >
                        <label className="control-label">Promotion Code</label>
                        <input
                            {...bind()}
                            type="email"
                            className="form-control"
                            placeholder="Promotion Code"
                        />
                        <p className="help-block">
                            {getError()}
                        </p>
                    </div>
                ))}

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={!fv.isValid()}
                >
                    Claim code
                </button>
            </div>
        );
    }
}