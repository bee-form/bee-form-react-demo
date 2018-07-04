const {createForm, basicValidators: {required}} = require("bee-form-react");
const cln = require("classnames");

import {dateStr} from "./tunnel-date-string";

export class ExampleDate extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = createForm({
            meeting_date: {
                validators: [required],
                tunnel: [dateStr]
            },
        });

        this.form.onChange(() => this.forceUpdate());
    }

    render() {
        const fv = this.form.createView();

        return (
            <div className="form">

                {fv.withControl("meeting_date", ({bind, isValid, getError}) => (
                    <div
                        className={cln("form-group", {"has-error": !isValid()})}
                    >
                        <label className="control-label">Meeting date</label>
                        <input
                            {...bind()}
                            className="form-control"
                            placeholder="Meeting date... MM-DD-YYYY"
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
                    Add meeting
                </button>
            </div>
        );
    }
}