import {dateStr} from "./tunnel-date-string";
import {timeStr} from "./tunnel-time-string";

const {createForm, basicValidators: {required}} = require("bee-form-react");
const cln = require("classnames");

export class ExampleDateTime extends React.Component {

    constructor(props, context) {
        super(props, context);


        this.form = createForm({
            meeting_time: {
                validators: [required],
                faces: {
                    "date": {
                        tunnel: [dateStr]
                    },
                    "time": {
                        tunnel: [timeStr]
                    },
                },
            },
        });

        this.form.onChange(() => this.forceUpdate());

    }

    render() {
        const fv = this.form.createView();

        let r = (label, placeholder) => ({bind, isValid, getError}) => (
            <div
                className={cln("form-group", {"has-error": !isValid()})}
            >
                <label className="control-label">{label}</label>
                <input
                    {...bind()}
                    className="form-control"
                    placeholder={placeholder}
                />
                <p className="help-block">
                    {getError()}
                </p>
            </div>
        );

        return (
            <div className="form">

                {fv.withControl("meeting_time!date", r("Meeting date", "Meeting date... MM-DD-YYYY"))}
                {fv.withControl("meeting_time!time", r("Meeting time", "Meeting time... HH:mm"))}

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