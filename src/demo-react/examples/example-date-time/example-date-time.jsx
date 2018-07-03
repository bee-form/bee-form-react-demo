import {dateStr} from "./tunnel-date-string";
import {timeStr} from "./tunnel-time-string";
const {bindDom, bindCom} = RlfDemo.RLF;
const {required} = RlfDemo.RLF.validates;

export class ExampleDateTime extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.form = bindCom({
            meeting_time: [required],
        }, {
            component: this,
        });
    }

    render() {
        return bindDom(this.form)(
            <div className="form">

                <div
                    lf-fg="meeting_time!date"
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

                <div
                    lf-fg="meeting_time!time"
                    className="form-group"
                >
                    <label className="control-label">Meeting time</label>
                    <input
                        lf-bind
                        lf-tunnel={[timeStr]}
                        className="form-control"
                        placeholder="Meeting time... HH:mm"
                    />
                    <p className="help-block" lf-err-msg="Meeting time"/>
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