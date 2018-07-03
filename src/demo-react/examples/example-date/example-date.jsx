import {dateStr} from "./tunnel-date-string";
const {bindDom, bindCom} = RlfDemo.RLF;
const {required} = RlfDemo.RLF.validates;

export class ExampleDate extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = bindCom({
            meeting_date: [required],
        }, {
            component: this,
        });
    }

    render() {
        return bindDom(this.form)(
            <div className="form">

                <div
                    lf-fg="meeting_date"
                    className="form-group"
                >
                    <label className="control-label">Meeting date</label>
                    <input
                        lf-bind
                        lf-tunnel={[dateStr]}
                        className="form-control"
                        placeholder="Meeting date... MM-DD-YYYY"
                    />
                    <p className="help-block" lf-err-msg="Meeting date"/>
                </div>

                {/* Submit button */}
                <button
                    type="submit" className="btn btn-primary"
                    disabled={this.form.isInvalid()}
                >
                    Add meeting
                </button>
            </div>
        );
    }
}